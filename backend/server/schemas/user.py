from typing import Optional
from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    """Base model for user."""
    email: EmailStr
    display_name: Optional[str] = None

class UserCreate(UserBase):
    """Create model for user."""
    password: str

class UserOutput(UserBase):
    id: str
    created_at: str

    model_config = {"from_attributes": True}