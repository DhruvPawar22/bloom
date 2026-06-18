from sqlalchemy.ext.asyncio import AsyncSession
from server.schemas.daily_logs import LogCreate
import uuid
from server.crud import logs as crud

async def upsert_log(db: AsyncSession, user_id:uuid.UUID , data:LogCreate ):

    existing_log = await crud.get_log_by_date(db, user_id, data.date)

    if not existing_log:
        return await crud.create_log(db, user_id, data)
    else:
        return await crud.update_log(db, existing_log, data)
