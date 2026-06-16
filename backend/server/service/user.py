from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from server.crud import user as crud
from server.schemas.user import UserCreate, Token, UserLogin
from server.utils.auth import hash_password, verify_password, create_access_token

async def authenticate_user(db: AsyncSession, email: str, password: str):
    user = await crud.get_user_by_email(db, email=email)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    if not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return user

async def register_user(db: AsyncSession, user_input: UserCreate):
    existing_user = await crud.get_user_by_email(db, email=user_input.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already exists")

    hashed_password = hash_password(user_input.password)
    return await crud.create_user(
        db,
        email=user_input.email,
        hashed_password=hashed_password,
        display_name=user_input.display_name,
    )




async def login_user(db:AsyncSession, user_input: UserLogin):
    existing_user = await crud.get_user_by_email(db, email=user_input.email)
    if not existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Credentials")

    user = await authenticate_user(db, email=user_input.email, password=user_input.password)
    
    token = create_access_token(data={"sub": str(user.id)})
    return Token(access_token=token, token_type="bearer")



