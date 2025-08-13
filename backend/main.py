from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from os import getenv
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from zoneinfo import ZoneInfo

from backend.api.api import router as api_router
from backend.api.api import update_hours, update_photos


load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    await update_hours()
    await update_photos()

    # updates hours automatically every day at 12:00 PM and 6:00 PM
    scheduler = AsyncIOScheduler(timezone=ZoneInfo('America/Los_Angeles'))
    scheduler.add_job(update_hours, "cron", hour=12)
    scheduler.add_job(update_hours, "cron", hour=18)
    scheduler.start()

    yield

api_url = getenv('API_URL')
app = FastAPI(docs_url=api_url, redoc_url=None, openapi_url="/openapi.json", root_path="/api", host="0.0.0.0", port=8000, lifespan=lifespan)
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)