from server.models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

async def get_user_by_email(db: AsyncSession, email: str) -> User | None:
    result = await db.execute(select(User).where(User.email == email))
    return result.scalar_one_or_none()


async def get_user_by_id(db: AsyncSession, user_id: str) -> User | None:
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalar_one_or_none()


async def create_user(db: AsyncSession, email: str, hashed_password: str, display_name: str | None = None) -> User:
    new_user = User(email=email, hashed_password=hashed_password, display_name=display_name)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return new_user