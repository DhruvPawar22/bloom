from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from server.crud import user as crud
from server.schemas.user import UserCreate
from server.utils.auth import hash_password


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
