from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import text
from app.db.database import get_db

router = APIRouter()

class HealthResponse(BaseModel):
    status: str
    database: str = "unknown"

@router.get("/ping")
async def ping():
    return {"ping": "pong"}

@router.get("/health", response_model=HealthResponse)
async def health_check():
    db_status = "disconnected"
    try:
        gen = get_db()
        session = next(gen)
        try:
            session.execute(text("SELECT 1"))
            db_status = "connected"
        finally:
            gen.close()
    except Exception as e:
        db_status = f"error: {str(e)}"
        
    return {"status": "ok", "database": db_status}
