from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from server.database import get_db
from server.utils.dependencies import get_current_user
from server.models.daily_log import DailyLog
from server.models.user import User
from server.schemas.daily_logs import LogCreate, LogOutput
from server.service.logs import upsert_log

router = APIRouter(prefix="/logs", tags=["logs"])


@router.post("", response_model=LogOutput)
async def create_or_update_log(
    data: LogCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return await upsert_log(db, current_user.id, data)

