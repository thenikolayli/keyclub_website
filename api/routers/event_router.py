from fastapi.responses import JSONResponse
from fastapi import APIRouter, status, Depends
from sqlmodel import Session, select

from api.utils.event_logging_utils import log_event, log_meeting
from api.models.event_models import EventCreate, MeetingCreate, Event
from api.utils.auth_utils import require_admin
import api.config as config
import api.database as database

router = APIRouter(prefix="/api/event", tags=["event"])


@router.post("/log_event", dependencies=[Depends(require_admin)])
async def keyclub_log_event(event_data: EventCreate):
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

    save_event_to_db(log_event_response)
    return JSONResponse(log_event_response, status_code=status.HTTP_200_OK)

@router.post("/log_meeting", dependencies=[Depends(require_admin)])
async def keyclub_log_meeting(meeting_data: MeetingCreate):
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

    save_event_to_db(log_meeting_response)
    return JSONResponse(log_meeting_response, status_code=status.HTTP_200_OK)

@router.get("/", dependencies=[Depends(require_admin)])
async def get_events(count: int = 10, skip: int = 0, session = Depends(database.get_session)):
    users = session.exec(select(Event).offset(skip).limit(count)).all()
    return JSONResponse([user.model_dump(mode="json") for user in users], status_code=status.HTTP_200_OK)


# saves an event or meeting to the database
def save_event_to_db(response):
    # creates db entry
    title = response.get("event_title")
    hours_total = 0
    people_attended = 0

    for volunteer in response.get("volunteers"):
        people_attended += 1
        hours_total += volunteer.get("hours")

    # creates entry and writes to db
    event_write = Event(
        title=title,
        hours_total=hours_total,
        people_attended=people_attended,
    )
    with Session(database.engine) as session:
        session.add(event_write)
        session.commit()