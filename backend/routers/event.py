from fastapi.responses import JSONResponse
from fastapi import APIRouter, status, Depends
from sqlmodel import Session

from backend.keyclubutils import log_event, log_meeting
from backend.models import EventCreate, MeetingCreate, Event
from backend.routers.auth import require_admin
import backend.config as config
import backend.database as database

router = APIRouter(prefix="/api/event", tags=["event"])


@router.post("/log_event")
async def keyclub_log_event(event_data: EventCreate, _ = Depends(require_admin)):
    document_id = event_data.link
    hours_multiplier = event_data.hours_multiplier
    log_event_response = log_event(
        document_id=document_id,
        hours_multiplier=hours_multiplier,
        docs_service=config.docs_service,
        sheets_service=config.sheets_service
    )

    if log_event_response.get("error"):
        return JSONResponse(log_event_response.get("error"), status_code=status.HTTP_400_BAD_REQUEST)

    await save_event_to_db(log_event_response)
    return JSONResponse(log_event_response, status_code=status.HTTP_200_OK)

@router.post("/log_meeting")
async def keyclub_log_meeting(meeting_data: MeetingCreate, _ = Depends(require_admin)):
    document_id = meeting_data.link
    first_name_col = meeting_data.first_name_col
    last_name_col = meeting_data.last_name_col
    meeting_length = meeting_data.meeting_length
    meeting_title = meeting_data.title
    log_meeting_response = log_meeting(
        document_id=document_id,
        first_name_col=first_name_col,
        last_name_col=last_name_col,
        meeting_length=meeting_length,
        meeting_title=meeting_title,
        sheets_service=config.sheets_service
    )

    if log_meeting_response.get("error"):
        return JSONResponse(log_meeting_response.get("error"), status_code=status.HTTP_400_BAD_REQUEST)

    await save_event_to_db(log_meeting_response)
    return JSONResponse(log_meeting_response, status_code=status.HTTP_200_OK)


# saves an event or meeting to the database
async def save_event_to_db(response):
    # creates db entry
    title = response.get("event_title")
    hours_logged = 0
    hours_not_logged = 0
    people_attended = 0

    # volunteers logged
    if response.get("logged"):
        for volunteer_logged, data in response.get("logged").items():
            hours_logged += data
            people_attended += 1

    # volunteers not logged
    if response.get("not_logged"):
        for volunteer_not_logged, data in response.get("not_logged").items():
            hours_not_logged += data
            people_attended += 1

    # creates entry and writes to db
    event_write = Event(
        title=title,
        hours_logged=hours_logged,
        hours_not_logged=hours_not_logged,
        people_attended=people_attended,
    )
    with Session(database.engine) as session:
        session.add(event_write)
        session.commit()