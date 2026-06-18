import uuid
import enum
from datetime import datetime

from sqlalchemy import Column, DateTime, String, Date, Boolean, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from server.database import Base


class FlowIntensity(enum.Enum):
    none = "none"
    spotting = "spotting"
    light = "light"
    medium = "medium"
    heavy = "heavy"


class MoodType(enum.Enum):
    happy = "happy"
    calm = "calm"
    energetic = "energetic"
    focused = "focused"
    sad = "sad"
    sensitive = "sensitive"
    irritable = "irritable"
    anxious = "anxious"
    tired = "tired"
    overwhelmed = "overwhelmed"


class DailyLog(Base):
    __tablename__ = "daily_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    date = Column(Date, nullable=False)
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    flow_entries = relationship("LogFlowEntry", back_populates="log", cascade="all, delete-orphan")
    moods = relationship("LogMood", back_populates="log", cascade="all, delete-orphan")
    sexual_activity = relationship("LogSexualActivity", back_populates="log", cascade="all, delete-orphan")
    medications = relationship("LogMedication", back_populates="log", cascade="all, delete-orphan")


class LogFlowEntry(Base):
    __tablename__ = "log_flow_entries"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    log_id = Column(UUID(as_uuid=True), ForeignKey("daily_logs.id"), nullable=False)
    intensity = Column(Enum(FlowIntensity), nullable=False)

    log = relationship("DailyLog", back_populates="flow_entries")


class LogMood(Base):
    __tablename__ = "log_moods"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    log_id = Column(UUID(as_uuid=True), ForeignKey("daily_logs.id"), nullable=False)
    mood = Column(Enum(MoodType), nullable=False)

    log = relationship("DailyLog", back_populates="moods")


class LogSexualActivity(Base):
    __tablename__ = "log_sexual_activity"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    log_id = Column(UUID(as_uuid=True), ForeignKey("daily_logs.id"), nullable=False)
    occurred = Column(Boolean, nullable=False, default=False)

    log = relationship("DailyLog", back_populates="sexual_activity")


class LogMedication(Base):
    __tablename__ = "log_medications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    log_id = Column(UUID(as_uuid=True), ForeignKey("daily_logs.id"), nullable=False)
    occurred = Column(Boolean, nullable=False, default=False)
    note = Column(String, nullable=True)

    log = relationship("DailyLog", back_populates="medications")
