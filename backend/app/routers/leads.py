from fastapi import APIRouter, HTTPException, Depends
from app.schemas.leads import LeadCreate
from app.schemas.base import SuccessResponse, PaginatedResponse
from app.repositories.postgres import pg_repo
from app.routers.auth import get_current_admin
import uuid
from datetime import datetime
from pydantic import BaseModel

router = APIRouter()

class StatusUpdate(BaseModel):
    status: str

@router.post("", response_model=SuccessResponse)
async def submit_lead(lead: LeadCreate):
    # In PostgreSQL, we can use a UUID for the primary key
    lead_id = str(uuid.uuid4())
    lead_ref = f"L-{lead_id[:8].upper()}"
    now = datetime.utcnow()
    
    lead_data = {
        "id": lead_id,
        "leadRef": lead_ref,
        "name": lead.name,
        "email": getattr(lead, "email", None),
        "phone": lead.phone,
        "company": None,
        "serviceInterest": None,
        "message": lead.message,
        "status": "NEW",
        "createdAt": now  # Pass datetime object directly
    }

    try:
        await pg_repo.insert("Leads", lead_data)
        return SuccessResponse(data={"leadRef": lead_ref, "message": "Lead submitted successfully"})
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))

@router.get("")
async def get_leads(
    page: int = 1, 
    limit: int = 50, 
    status: str = None, 
    search: str = None,
    admin=Depends(get_current_admin)
):
    try:
        records = await pg_repo.get_all("Leads")
        
        # In-memory filtering/search (since repo is generic, or we can add params to repo)
        if status:
            records = [r for r in records if r.get("status") == status]
            
        if search:
            s = search.lower()
            records = [
                r for r in records if 
                s in r.get("name", "").lower() or 
                s in r.get("email", "").lower() or 
                s in r.get("leadRef", "").lower()
            ]
            
        # Basic pagination
        start = (page - 1) * limit
        end = start + limit
        items = records[start:end]
        
        return {
            "success": True,
            "data": {
                "items": items,
                "pagination": {
                    "total": len(records),
                    "page": page,
                    "limit": limit,
                    "totalPages": (len(records) + limit - 1) // limit
                }
            }
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))

@router.patch("/{id}/status")
async def update_lead_status(id: str, payload: StatusUpdate, admin=Depends(get_current_admin)):
    try:
        updated = await pg_repo.update("Leads", "id", id, {"status": payload.status})
        return {"success": True, "data": updated}
    except Exception as e:
        if str(e) == "RECORD_NOT_FOUND":
            raise HTTPException(status_code=404, detail="Lead not found")
        raise HTTPException(status_code=503, detail=str(e))
