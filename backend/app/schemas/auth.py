from pydantic import BaseModel, EmailStr
from typing import Optional

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class BootstrapRequest(BaseModel):
    email: EmailStr
    password: str

class TokenData(BaseModel):
    email: str
    role: str

class AdminUser(BaseModel):
    id: str
    email: str
    role: str
