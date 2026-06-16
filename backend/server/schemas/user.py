from typing import Optional
from pydantic import BaseModel, EmailStr
import uuid
from datetime import datetime
class UserBase(BaseModel):
    """Base model for user."""
    email: EmailStr

class UserCreate(UserBase):
    """Create model for user."""
    password: str
    display_name: Optional[str] = None

class UserLogin(UserBase):
    password: str
class UserOutput(UserBase):
    id: uuid.UUID
    created_at: datetime

    model_config = {"from_attributes": True}
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"