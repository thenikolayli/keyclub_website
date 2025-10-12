from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from datetime import datetime, timezone, timedelta

from api.utils.event_logging_utils import update_hours_list
from api.utils.event_logging_utils import get_hours as get_hours_util
import api.config as config

router = APIRouter(prefix="/api/hours", tags=["hours"])


@router.get("/update_hours")
async def update_hours():
    await update_hours_list(config.names_hours_list)
    utc_time = datetime.now(timezone(timedelta(hours=-5)))
    config.hours_last_updated = utc_time.timestamp()
    print("hours updated!")

    return JSONResponse("hours updated!", status_code=status.HTTP_200_OK)

@router.get("/hours_last_updated")
async def update_hours_last_updated():

    return JSONResponse(config.hours_last_updated, status_code=status.HTTP_200_OK)

@router.get("/get_hours")
async def get_hours(name: str):
    hours = get_hours_util(config.names_hours_list, name)

    if hours:
        print(hours)
        return JSONResponse(hours, status_code=status.HTTP_200_OK)
    return JSONResponse("hours not found", status_code=status.HTTP_404_NOT_FOUND)
