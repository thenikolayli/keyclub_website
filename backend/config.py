from dotenv import load_dotenv
from os import getenv

from sqlmodel import create_engine, SQLModel, Session
from backend.models import Event, User
# importing models so sqlmodel detects them and creates/updates tables

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

import json

load_dotenv()

api_url = getenv('API_URL')

keyclub_email = getenv("KEYCLUB_EMAIL")
app_password = getenv("APP_PASSWORD")

keyjson_path = "backend/key.json"
scopes = json.loads(getenv("API_SCOPES"))

credentials = Credentials.from_service_account_file(keyjson_path, scopes=scopes)
drive_service = build("drive", "v3", credentials=credentials)
sheets_service = build("sheets", "v4", credentials=credentials)
docs_service = build("docs", "v1", credentials=credentials)

image_mimeTypes = ["image/jpeg", "image/png", "image/webp", "image/heif"]
folder_mimeType = 'application/vnd.google-apps.folder'
photos_path = "backend/photos" # because of absolute imports, youre supposed to run this from the parent directory
photos_folder_id = getenv("PHOTOS_FOLDER_ID")

names_hours_list = []
hours_last_updated = 0
spreadsheet_id = getenv("HOURS_SPREADSHEET_ID")
names_col = getenv("NAMES_COL")
nicknames_col = getenv("NICKNAMES_COL")
year_col = getenv("YEAR_COL")
term_hours_col = getenv("TERM_HOURS_COL")
all_hours_col = getenv("ALL_HOURS_COL")
spreadsheet_ranges = [names_col, nicknames_col]

banned_usernamechars = " /\\"

engine = create_engine("sqlite:///db.sqlite3")

def update_tables():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session