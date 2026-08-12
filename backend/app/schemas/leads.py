from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class LeadCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: Optional[EmailStr] = None
    phone: str = Field(..., min_length=7)
    message: str = Field(..., min_length=5)

class LeadResponse(BaseModel):
    id: str
    leadRef: str
    name: str
    email: str
    phone: str
    message: str
    status: str
    createdAt: str
