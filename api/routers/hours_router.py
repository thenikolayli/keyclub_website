from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse

from datetime import datetime

from api.utils.hours_util import update_hours_list
from api.utils.hours_util import get_hours as get_hours_util
import api.config as config
import api.database as database

router = APIRouter(prefix="/api/hours", tags=["hours"])


@router.get("/update_hours")
async def update_hours():
    if datetime.now().timestamp() - config.hours_last_updated < config.hours_update_timeout:
        return JSONResponse("Please wait at least 5 minutes between hours update requests.", status_code=status.HTTP_400_BAD_REQUEST)

    await update_hours_list()
    return JSONResponse("Hours updated!", status_code=status.HTTP_200_OK)

@router.get("/hours_last_updated")
async def update_hours_last_updated():
    return JSONResponse(config.hours_last_updated, status_code=status.HTTP_200_OK)

@router.get("/get_hours")
async def get_hours(name: str, session = Depends(database.get_session)):
    hours = get_hours_util(session, name)

    if hours:
        return JSONResponse(hours.model_dump(mode="json"), status_code=status.HTTP_200_OK)
    return JSONResponse("Hours not found.", status_code=status.HTTP_404_NOT_FOUND)
