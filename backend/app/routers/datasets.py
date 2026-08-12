from fastapi import APIRouter, HTTPException, Path, Depends
from app.repositories.postgres import pg_repo
from app.schemas.base import SuccessResponse, PaginatedResponse
from app.routers.auth import get_current_admin
from typing import Optional

router = APIRouter()

# Map frontend expected endpoints to Models
DATASET_MAPPING = {
    "services": "Services",
    "industries": "Industries",
    "case-studies": "CaseStudies",
    "products": "Products",
    "testimonials": "Testimonials",
    "faqs": "FAQs",
    "blog": "Blog",
    "careers": "Jobs"
}

@router.get("/{dataset}")
async def get_dataset(dataset: str, page: int = 1, limit: int = 50):
    if dataset not in DATASET_MAPPING:
        raise HTTPException(status_code=404, detail="DATASET_NOT_FOUND")
        
    worksheet_name = DATASET_MAPPING[dataset]
    try:
        records = await pg_repo.get_all(worksheet_name)
        # Filter published only for public endpoints
        filtered = [r for r in records if r.get("status") == "PUBLISHED" or r.get("published") == True or r.get("published") == "TRUE" or r.get("published") == 1]
        
        if not filtered and len(records) > 0 and "status" not in records[0] and "published" not in records[0]:
            filtered = records

        # Basic pagination
        start = (page - 1) * limit
        end = start + limit
        items = filtered[start:end]
        
        return {
            "success": True,
            "data": {
                "items": items,
                "pagination": {
                    "total": len(filtered),
                    "page": page,
                    "limit": limit,
                    "totalPages": (len(filtered) + limit - 1) // limit
                }
            }
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))

@router.get("/{dataset}/{slug}")
async def get_dataset_item(dataset: str, slug: str):
    if dataset not in DATASET_MAPPING:
        raise HTTPException(status_code=404, detail="DATASET_NOT_FOUND")
        
    worksheet_name = DATASET_MAPPING[dataset]
    try:
        item = await pg_repo.get_by_id(worksheet_name, "slug", slug)
        if not item:
            # Fallback to id if slug not found
            item = await pg_repo.get_by_id(worksheet_name, "id", slug)
            
        if not item:
            raise HTTPException(status_code=404, detail="NOT_FOUND")
            
        return {"success": True, "data": item}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))

# We should also redirect /api/services to /api/datasets/services for convenience
# But since the frontend uses /api/services, we will add direct routes in main.py
