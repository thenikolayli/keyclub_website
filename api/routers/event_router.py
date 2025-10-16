from fastapi.responses import JSONResponse
from fastapi import APIRouter, status, Depends
from sqlmodel import Session, select

from api.utils.event_logging_utils import log_event, log_meeting, save_event_to_db
from api.models.event_models import EventCreate, MeetingCreate, Event
from api.utils.auth_utils import require_admin
import api.config as config
import api.database as database

router = APIRouter(prefix="/api/event", tags=["event"])


@router.post("/log_event", dependencies=[Depends(require_admin)])
async def keyclub_log_event(event_data: EventCreate, session = Depends(database.get_session)):
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

    save_event_to_db(log_event_response, session)
    return JSONResponse(log_event_response, status_code=status.HTTP_200_OK)

@router.post("/log_meeting", dependencies=[Depends(require_admin)])
async def keyclub_log_meeting(meeting_data: MeetingCreate, session = Depends(database.get_session)):
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

    save_event_to_db(log_meeting_response, session = Depends(database.get_session))
    return JSONResponse(log_meeting_response, status_code=status.HTTP_200_OK)

@router.get("/", dependencies=[Depends(require_admin)])
async def get_events(count: int = 10, skip: int = 0, session = Depends(database.get_session)):
    users = session.exec(select(Event).offset(skip).limit(count)).all()
    return JSONResponse([user.model_dump(mode="json") for user in users], status_code=status.HTTP_200_OK)

