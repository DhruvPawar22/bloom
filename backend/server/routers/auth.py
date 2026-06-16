from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from server.database import get_db
from server.utils.dependencies import get_current_user
from server.models.user import User
from server.schemas.user import UserCreate, UserLogin, UserOutput, Token
from server.service.user import register_user, login_user

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserOutput, status_code=status.HTTP_201_CREATED)
async def register(user_input: UserCreate, db: AsyncSession = Depends(get_db)):
    return await register_user(db, user_input)

@router.post("/login", response_model=Token, status_code=status.HTTP_200_OK)
async def login(user_input: UserLogin, db: AsyncSession = Depends(get_db)):
    return await login_user(db, user_input)


@router.get("/me", response_model=UserOutput)
async def me(current_user: User = Depends(get_current_user)):
    return current_user
