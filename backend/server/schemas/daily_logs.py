from typing import Optional
from pydantic import BaseModel
import uuid
from datetime import date
from server.models.daily_log import FlowIntensity, MoodType


class MedicationInput(BaseModel):
    occurred: bool
    note: Optional[str] = None


class MedicationOutput(BaseModel):
    id: uuid.UUID
    occurred: bool
    note: Optional[str] = None
    model_config = {"from_attributes": True}


class FlowEntryOutput(BaseModel):
    id: uuid.UUID
    intensity: FlowIntensity
    model_config = {"from_attributes": True}


class MoodOutput(BaseModel):
    id: uuid.UUID
    mood: MoodType
    model_config = {"from_attributes": True}


class SexualActivityOutput(BaseModel):
    id: uuid.UUID
    occurred: bool
    model_config = {"from_attributes": True}


class LogBase(BaseModel):
    date: date
    flow_intensity: Optional[FlowIntensity] = None
    moods: list[MoodType] = []
    sexual_activity: bool = False
    notes: Optional[str] = None


class LogCreate(LogBase):
    medication: Optional[MedicationInput] = None


class LogOutput(BaseModel):
    id: uuid.UUID
    date: date
    notes: Optional[str] = None
    flow_entries: list[FlowEntryOutput] = []
    moods: list[MoodOutput] = []
    sexual_activity: list[SexualActivityOutput] = []
    medications: list[MedicationOutput] = []
    model_config = {"from_attributes": True}
