from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from server.database import get_db
from server.schemas.user import UserCreate, UserOutput, Token
from server.service.user import register_user, login_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOutput, status_code=status.HTTP_201_CREATED)
async def register(user_input: UserCreate, db: AsyncSession = Depends(get_db)):
    return await register_user(db, user_input)

@router.post("/login",response_model=Token ,status_code=status.HTTP_200_OK)
async def login(user_input: UserCreate, db: AsyncSession = Depends(get_db)):
    return await login_user(db, user_input)
