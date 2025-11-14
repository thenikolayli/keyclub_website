from datetime import datetime

import config
import database
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from models.hours_models import Hours
from sqlmodel import select
from utils.hours_util import get_hours as get_hours_util
from utils.hours_util import update_hours_list

router = APIRouter(prefix="/api/hours", tags=["hours"])


@router.get("/update_hours")
async def update_hours():
    if (
        datetime.now().timestamp() - config.hours_last_updated
        < config.hours_update_timeout
    ):
        return JSONResponse(
            "Please wait at least 5 minutes between hours update requests.",
            status_code=status.HTTP_400_BAD_REQUEST,
        )

    await update_hours_list()
    return JSONResponse("Hours updated!", status_code=status.HTTP_200_OK)


@router.get("/hours_last_updated")
async def update_hours_last_updated():
    return JSONResponse(config.hours_last_updated, status_code=status.HTTP_200_OK)


@router.get("/get_hours")
async def get_hours(name: str, session=Depends(database.get_session)):
    hours = get_hours_util(session, name)

    if hours:
        return JSONResponse(
            hours.model_dump(mode="json"), status_code=status.HTTP_200_OK
        )
    return JSONResponse("Hours not found.", status_code=status.HTTP_404_NOT_FOUND)


@router.get("/ranks")
async def get_ranks(year: int, session=Depends(database.get_session)):
    # gets the ranks in ascending order by all hours
    ranks = session.exec(
        select(Hours).where(Hours.grad_year == year).order_by(Hours.all_hours)
    ).all()
    if len(ranks) <= 5:
        return JSONResponse([], status_code=status.HTTP_404_NOT_FOUND)
    cleaned = []

    for rank in ranks:
        if rank.name not in config.rank_blacklist:
            to_append = rank.model_dump(mode="json")
            to_append.pop("id")
            cleaned.append(to_append)
    # returns the last 5 elements and reverses them so it's top 5 people by all hours in ascending order
    return JSONResponse(cleaned[-5:][::-1], status_code=status.HTTP_200_OK)
