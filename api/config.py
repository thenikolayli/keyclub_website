import json
import logging
from os import getenv

import cloudinary
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

goaccess_path = "data/report.html"

banner_json_path = "data/banner.json"
keyclub_email = "jhskeyclub21@gmail.com"
app_password = getenv("APP_PASSWORD")

keyjson_path = "data/key.json"
scopes = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/calendar.readonly",
]

credentials = Credentials.from_service_account_file(keyjson_path, scopes=scopes)
drive_service = build("drive", "v3", credentials=credentials)
sheets_service = build("sheets", "v4", credentials=credentials)
docs_service = build("docs", "v1", credentials=credentials)
calendar_service = build("calendar", "v3", credentials=credentials)

image_mimeTypes = ["image/jpeg", "image/png", "image/webp", "image/heif"]
folder_mimeType = "application/vnd.google-apps.folder"
photos_path = "data/photos"  # because of absolute imports, you're supposed to run this from the parent directory
photos_folder_id = getenv("PHOTOS_FOLDER_ID")

hours_last_updated = 0
hours_update_timeout = 5 * 60  # 5 min timeout between hour update requests
spreadsheet_id = getenv("HOURS_SPREADSHEET_ID")
names_col = "A2:A"
nicknames_col = "B2:B"
year_col = "C2:C"
term_hours_col = "I2:I"
all_hours_col = "H2:H"
spreadsheet_ranges = [names_col, nicknames_col]
rank_blacklist = json.loads(getenv("RANK_BLACKLIST", "[]"))

banned_usernamechars = " /\\"
admin_username = getenv("ADMIN_USERNAME")
admin_password = getenv("ADMIN_PASSWORD")

jwt_secret = getenv("JWT_SECRET")
cookie_secure = getenv("COOKIE_SECURE") == "True"
cookie_domain = getenv("COOKIE_DOMAIN")
cookie_samesite = "Lax"
cookie_httponly = True

db_string = getenv("DB_STRING")

reminds_template = "assets/template.jpg"
font_path = "assets/centurygothic.ttf"
reminds_logger_path = "data/reminds.log"
fb_token = getenv("FB_TOKEN")
calendar_id = getenv("CALENDAR_ID")
image_save_path = "data/post.jpg"

override_admin = getenv("OVERRIDE_ADMIN") == "True"
run_loop_functions = getenv("RUN_LOOP_FUNCTIONS") == "True"

cloudinary.config(
    cloud_name=getenv("CLOUD_NAME"),
    api_key=getenv("CLOUD_API_KEY"),
    api_secret=getenv("CLOUD_API_SECRET"),
    secure=True,
)

logging.basicConfig(
    filename=reminds_logger_path,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
