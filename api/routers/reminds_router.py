from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from sqlmodel import select
from api.utils.auth_utils import require_admin
from api.utils.reminds_utils import post_event, main
from api.models.reminds_models import PostEvent, CurrentEvent
import api.database as database
import traceback, logging

router = APIRouter(prefix="/api/reminds", tags=["reminds"])


@router.post("/post", dependencies=[Depends(require_admin)])
async def post(event: PostEvent):
    try:
        post_event(event)
    except Exception as e:
        logging.info(f"Error posting event: {traceback.format_exc()}")
        return JSONResponse(str(e), status_code=status.HTTP_400_BAD_REQUEST)
    return JSONResponse("Event posted", status_code=status.HTTP_200_OK)

@router.get("/run_loop", dependencies=[Depends(require_admin)])
async def run_loop():
    await main()
    return JSONResponse("Ran main loop.", status_code=status.HTTP_200_OK)


@router.get("/")
async def get_current_events(count: int = 10, skip: int = 0, session = Depends(database.get_session)):
    current_events = session.exec(select(CurrentEvent).offset(skip).limit(count)).all()
    for i in range(len(current_events)):
        current_events[i] = current_events[i].model_dump()
        current_events[i].update({"delete_date": str(current_events[i].get("delete_date"))})
    return JSONResponse(current_events, status_code=status.HTTP_200_OK)

@router.delete("/{current_event_id}", dependencies=[Depends(require_admin)])
async def delete_current_event(current_event_id: int, session = Depends(database.get_session)):
    current_event = session.exec(select(CurrentEvent).where(CurrentEvent.id == current_event_id)).first()
    if current_event:
        session.delete(current_event)
        session.commit()
        return JSONResponse(current_event.model_dump(mode="json"), status_code=status.HTTP_200_OK)
    return JSONResponse("No model found.", status_code=status.HTTP_404_NOT_FOUND)