from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from os import getenv
from api.api import router as api_router
import json

load_dotenv()
app = FastAPI(docs_url="/api", redoc_url=None, openapi_url="/openapi.json", root_path="/api", host="0.0.0.0", port=8000)
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=json.loads(getenv("CORS_ORIGINS")),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)