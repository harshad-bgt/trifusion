from fastapi import APIRouter, HTTPException, Header, Depends
from app.schemas.auth import LoginRequest
from app.schemas.base import ErrorResponse, SuccessResponse
from app.core.security import verify_password, create_access_token, get_password_hash, verify_token
from app.repositories.postgres import pg_repo
import os

router = APIRouter()

async def get_current_admin(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="UNAUTHORIZED")
    token = authorization.split(" ")[1]
    payload = verify_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="INVALID_TOKEN")
    return payload

@router.post("/login", response_model=SuccessResponse)
async def login(credentials: LoginRequest):
    try:
        users = await pg_repo.get_all("AdminUsers")
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))
        
    user = next((u for u in users if u.get("email") == credentials.email), None)
    if not user or not verify_password(credentials.password, user.get("password_hash", "")):
        # Provide generic error for invalid credentials
        raise HTTPException(status_code=401, detail="UNAUTHORIZED")
        
    token = create_access_token(data={"email": user["email"], "role": user.get("role", "admin")})
    return SuccessResponse(data={"token": token, "user": {"id": user.get("id"), "email": user.get("email"), "role": user.get("role")}})

@router.post("/verify", response_model=SuccessResponse)
async def verify(admin=Depends(get_current_admin)):
    return SuccessResponse(data={"user": {"email": admin["email"], "role": admin["role"]}})

@router.post("/bootstrap", response_model=SuccessResponse)
async def bootstrap():
    """
    Explicit operation to bootstrap the first admin user using environment variables.
    Can be run once and then credentials removed from environment.
    """
    bootstrap_email = os.getenv("ADMIN_BOOTSTRAP_EMAIL")
    bootstrap_password = os.getenv("ADMIN_BOOTSTRAP_PASSWORD")
    
    if not bootstrap_email or not bootstrap_password:
        raise HTTPException(status_code=400, detail="Missing bootstrap configuration")
        
    try:
        users = await pg_repo.get_all("AdminUsers")
        if any(u.get("email") == bootstrap_email for u in users):
            return SuccessResponse(data={"message": "Admin already bootstrapped"})
            
        hashed = get_password_hash(bootstrap_password)
        import uuid
        await pg_repo.insert("AdminUsers", {
            "id": str(uuid.uuid4()),
            "email": bootstrap_email,
            "password_hash": hashed,
            "role": "admin"
        })
        return SuccessResponse(data={"message": "Admin user created successfully"})
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))
