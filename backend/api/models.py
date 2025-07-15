from pydantic import BaseModel
from datetime import datetime

class Message(BaseModel):
    first_name: str
    last_name: str
    contact: str # email or phone number
    message: str

# models that represents a logged event in key club
# how an event is saved in the database
class EventLoggedModel(BaseModel):
    timestamp: datetime
    title: str
    hours_logged: float
    hours_not_logged: float
    people_attended: int

# how an event is patched/updated in the database
class EventLoggedPatchModel(BaseModel):
    id: str
    field: str
    value: str

# info needed to log an event
class EventLoggedRequestModel(BaseModel):
    api_key: str
    link: str
    hours_multiplier: float

# info needed to log a meeting
class MeetingLoggedRequestModel(BaseModel):
    api_key: str
    link: str
    first_name_col: str
    last_name_col: str
    meeting_length: int
    title: str