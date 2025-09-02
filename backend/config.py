from dotenv import load_dotenv
from os import getenv

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

load_dotenv()

api_url = getenv('API_URL')

banner_json_path = "backend/banner.json"
keyclub_email = "jhskeyclub21@gmail.com"
app_password = getenv("APP_PASSWORD")

keyjson_path = "backend/key.json"
scopes = ["https://www.googleapis.com/auth/drive.readonly", "https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/documents"]

credentials = Credentials.from_service_account_file(keyjson_path, scopes=scopes)
drive_service = build("drive", "v3", credentials=credentials)
sheets_service = build("sheets", "v4", credentials=credentials)
docs_service = build("docs", "v1", credentials=credentials)

image_mimeTypes = ["image/jpeg", "image/png", "image/webp", "image/heif"]
folder_mimeType = 'application/vnd.google-apps.folder'
photos_path = "backend/photos" # because of absolute imports, you're supposed to run this from the parent directory
photos_folder_id = getenv("PHOTOS_FOLDER_ID")

names_hours_list = []
hours_last_updated = 0
spreadsheet_id = getenv("HOURS_SPREADSHEET_ID")
names_col = "A3:A"
nicknames_col = "B3:B"
year_col = "D3:D"
term_hours_col = "I3:I"
all_hours_col = "H3:H"
spreadsheet_ranges = [names_col, nicknames_col]

banned_usernamechars = " /\\"
admin_username = getenv("ADMIN_USERNAME")
admin_password = getenv("ADMIN_PASSWORD")

jwt_secret = getenv("JWT_SECRET")
cookie_secure = True if getenv("COOKIE_SECURE") == "True" else False
cookie_domain = getenv("COOKIE_DOMAIN")
cookie_samesite = "Lax"
cookie_httponly = True
access_maxage = 5 * 60 # 5 minutes
refresh_maxage = 30 * 24 * 60 * 60  # 30 days