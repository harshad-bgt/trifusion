from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class PaginatedResponse(BaseModel):
    items: List[Any]
    pagination: Dict[str, Any]

class SuccessResponse(BaseModel):
    success: bool = True
    data: Optional[Any] = None

class ErrorResponse(BaseModel):
    success: bool = False
    error: Dict[str, str]
