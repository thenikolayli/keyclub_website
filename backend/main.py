from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dotenv import load_dotenv
from os import getenv
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from backend.api.api import router as api_router
from backend.api.api import update_hours


load_dotenv()
api_url = getenv('API_URL')
app = FastAPI(docs_url=api_url, redoc_url=None, openapi_url="/openapi.json", root_path="/api", host="0.0.0.0", port=8000)
app.include_router(api_router)

# updates hours automatically every day at 12:00 PM and 6:00 PM
scheduler = AsyncIOScheduler()
scheduler.add_job(update_hours, "cron", hour=12)
scheduler.add_job(update_hours, "cron", hour=18)
scheduler.start()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)