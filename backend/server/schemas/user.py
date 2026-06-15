from typing import Optional
from pydantic import BaseModel, EmailStr
import uuid
from datetime import datetime
class UserBase(BaseModel):
    """Base model for user."""
    email: EmailStr
    display_name: Optional[str] = None

class UserCreate(UserBase):
    """Create model for user."""
    password: str

class UserOutput(UserBase):
    id: uuid.UUID
    created_at: datetime

    model_config = {"from_attributes": True}