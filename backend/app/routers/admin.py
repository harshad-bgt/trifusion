from fastapi import APIRouter, Depends, HTTPException
from app.routers.auth import get_current_admin
from app.repositories.postgres import pg_repo
from pydantic import BaseModel

router = APIRouter()

@router.get("/stats")
async def get_admin_stats(admin=Depends(get_current_admin)):
    try:
        leads = await pg_repo.get_all("Leads")
        services = await pg_repo.get_all("Services")
        
        total_leads = len(leads)
        new_leads = len([l for l in leads if l.get("status") == "NEW"])
        
        return {
            "success": True,
            "data": {
                "totalLeads": total_leads,
                "newLeads": new_leads,
                "totalServices": len(services),
                "totalUsers": 1 # we can count users but usually it's just 1 admin
            }
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))
