from server.models.daily_log import DailyLog, LogFlowEntry, LogMood, LogSexualActivity, LogMedication, FlowIntensity
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
import uuid
from datetime import date
from server.schemas.daily_logs import LogCreate

async def get_log_by_date(db: AsyncSession, user_id:uuid.UUID, date:date)-> DailyLog | None:
    result = await db.execute(
        select(DailyLog)
        .where(DailyLog.user_id==user_id, DailyLog.date==date)
        .options(
            selectinload(DailyLog.flow_entries),
            selectinload(DailyLog.moods),
            selectinload(DailyLog.sexual_activity),
            selectinload(DailyLog.medications),
        )
        )
    return result.scalar_one_or_none()

async def create_log(db:AsyncSession, user_id:uuid.UUID, data: LogCreate)-> DailyLog | None:
    log = DailyLog(user_id=user_id, date=data.date, notes=data.notes)
    db.add(log)

    await db.flush()

    if data.flow_intensity:
        db.add(LogFlowEntry(log_id=log.id, intensity=data.flow_intensity))
    for mood in data.moods:
        db.add(LogMood(log_id=log.id, mood=mood))
    if data.sexual_activity is not None:
        db.add(LogSexualActivity(log_id=log.id, occurred=data.sexual_activity))
    if data.medication:
        db.add(LogMedication(log_id=log.id, occurred=data.medication.occurred, note=data.medication.note))
    

    await db.commit()
    return await get_log_by_date(db, user_id, data.date)


async def update_log(db: AsyncSession, existing_log: DailyLog, data: LogCreate) -> DailyLog:

    existing_log.notes = data.notes

    existing_log.flow_entries.clear()
    existing_log.moods.clear()
    existing_log.sexual_activity.clear()
    existing_log.medications.clear()

    await db.flush()

    if data.flow_intensity:
        existing_log.flow_entries.append(LogFlowEntry(intensity=data.flow_intensity))

    for mood in data.moods:
        existing_log.moods.append(LogMood(mood=mood))

    if data.sexual_activity is not None:
        existing_log.sexual_activity.append(LogSexualActivity(occurred=data.sexual_activity))

    if data.medication:
        existing_log.medications.append(LogMedication(occurred=data.medication.occurred, note=data.medication.note))

    await db.commit()
    return await get_log_by_date(db, existing_log.user_id, existing_log.date)


async def get_log_by_range_date(db:AsyncSession, user_id:uuid.UUID, start_date:date,end_date:date)->list[DailyLog] | None:
    result = await db.execute(
        select(DailyLog)
        .where(DailyLog.user_id==user_id, DailyLog.date.between(start_date,end_date))
        .options(
            selectinload(DailyLog.flow_entries),
            selectinload(DailyLog.moods),
            selectinload(DailyLog.sexual_activity),
            selectinload(DailyLog.medications),
        )
        )
    return result.scalars().all()
