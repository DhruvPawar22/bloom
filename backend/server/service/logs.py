from sqlalchemy.ext.asyncio import AsyncSession
from server.schemas.daily_logs import LogCreate
import uuid
from server.crud import logs as crud
from datetime import date
from fastapi import HTTPException, status

async def upsert_log(db: AsyncSession, user_id:uuid.UUID , data:LogCreate ):

    existing_log = await crud.get_log_by_date(db, user_id, data.date)

    if not existing_log:
        return await crud.create_log(db, user_id, data)
    else:
        return await crud.update_log(db, existing_log, data)


async def get_log_by_date(db: AsyncSession, user_id:uuid.UUID , log_date:date):
    log = await crud.get_log_by_date(db, user_id, log_date)

    if not log:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Log not found")
    return log        
