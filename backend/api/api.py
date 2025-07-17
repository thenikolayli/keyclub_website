import smtplib, json, random, os
from concurrent.futures import ThreadPoolExecutor
from email.message import EmailMessage
from pathlib import Path
from urllib import request as urllib_request
from datetime import datetime, timezone, timedelta

from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from backend.api.models import Message, EventLoggedRequestModel, MeetingLoggedRequestModel
from backend.api.keyclubutils import log_event, log_meeting
from backend.api.keyclubutils import update_hours_list as update_hours_util
from backend.api.keyclubutils import get_hours as get_hours_util
from os import getenv
from dotenv import load_dotenv
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorClient

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

load_dotenv()

router = APIRouter(prefix="", tags=["api"])
keyclub_email = getenv("KEYCLUB_EMAIL")
app_password = getenv("APP_PASSWORD")
api_key = getenv("API_KEY")

scopes = json.loads(getenv("API_SCOPES"))
photos_folder_id = getenv("PHOTOS_FOLDER_ID")
photos_path = "backend/photos" # because of absolute imports, youre supposed to run this from the parent directory
keyjson_path = str((Path(__file__).parent / "../key.json").resolve())
folder_mimeType = 'application/vnd.google-apps.folder'
image_mimeTypes = ["image/jpeg", "image/png", "image/webp", "image/heif"]
names_hours_list = []
hours_last_updated = 0

credentials = Credentials.from_service_account_file(keyjson_path, scopes=scopes)
drive_service = build("drive", "v3", credentials=credentials)
sheets_service = build("sheets", "v4", credentials=credentials)
docs_service = build("docs", "v1", credentials=credentials)


# ------------------EMAIL API STUFF------------------

# sends a message to the gmail
@router.post("/message")
async def message(email_message: Message):
    email = EmailMessage()
    email["To"] = keyclub_email
    email["From"] = keyclub_email
    email["Subject"] = f"Website Message from {email_message.first_name} {email_message.last_name}"
    email.set_content(f"Contact: {email_message.contact}\n\n{email_message.message}")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(keyclub_email, app_password)
        smtp.send_message(email)

    return JSONResponse("Message Sent", status_code=status.HTTP_200_OK)


# ------------------PHOTOS (WEBSITE GALLERY) API STUFF------------------

def get_photos_recursive(folder_id):
    image_file_ids = []
    result = drive_service.files().list(
        q=f"'{folder_id}' in parents and trashed = false",
        pageSize=1000
    ).execute()

    for file in result["files"]:
        if file["mimeType"] in image_mimeTypes:
            image_file_ids.append(f"https://lh3.googleusercontent.com/d/{file["id"]}=w1000?authuser=0")  # adds image file id to the list
        elif file["mimeType"] == folder_mimeType:
            image_file_ids.extend(
                get_photos_recursive(file["id"]))  # adds the return of the function for each subfolder id
    return image_file_ids

def download_photo(url, index):
    urllib_request.urlretrieve(url, f"{photos_path}/photo_{index}.png")

# downloads all photos from the google drive
@router.get("/update_photos")
async def update_photos():
    global photos_folder_id

    # deletes old photos
    for file in os.listdir(photos_path):
        file_path = os.path.join(photos_path, file)
        os.remove(file_path)

    # downloads new photos
    photo_urls = get_photos_recursive(photos_folder_id)
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(download_photo, photo_urls[index], index) for index in range(len(photo_urls))]

        # waits for everything to download
        for future in futures:
            future.result()

    return JSONResponse("Photos updated", status_code=status.HTTP_200_OK)

# returns an array of random photo urls
@router.get("/get_photos")
async def get_photos(count: int = 20):
    file_list = [each for each in os.listdir(photos_path) if os.path.isfile(os.path.join(photos_path, each))]
    photo_list = []

    while len(photo_list) < count:
        choice = random.choice(file_list)
        photo_list.append(f"/photos/{choice}")
        file_list.remove(choice)

    return photo_list


# ------------------EVENT LOGGING API STUFF------------------

# gets a collection from the database (look up how mongodb stores files and how their filesystem works)
async def get_collection(collection_name):
    client = AsyncIOMotorClient(getenv("MONGO_URI"))
    db = client["main"] # theres only one database
    collection = db[collection_name]

    return collection

# saves an event or meeting to the database
async def save_event_to_db(response):
    # creates db entry
    title = response.get("event_title")
    hours_logged = 0
    hours_not_logged = 0
    people_attended = 0

    # volunteers logged
    if response.get("logged"):
        for volunteer_logged, data in response.get("logged").items():
            hours_logged += data
            people_attended += 1

    # volunteers not logged
    if response.get("not_logged"):
        for volunteer_not_logged, data in response.get("not_logged").items():
            hours_not_logged += data
            people_attended += 1

    events_logged_collection = await get_collection("events_logged")
    await events_logged_collection.insert_one({
        "timestamp": datetime.now(),
        "title": title,
        "hours_logged": hours_logged,
        "hours_not_logged": hours_not_logged,
        "people_attended": people_attended,
    })

@router.post("/log_event")
async def keyclub_log_event(event_data: EventLoggedRequestModel):
    if event_data.api_key != api_key:
        return JSONResponse("invalid api key", status_code=status.HTTP_401_UNAUTHORIZED)

    document_id = event_data.link
    hours_multiplier = event_data.hours_multiplier
    log_event_response = log_event(
        document_id=document_id,
        hours_multiplier=hours_multiplier,
        docs_service=docs_service,
        sheets_service=sheets_service
    )

    if log_event_response.get("error"):
        return JSONResponse(log_event_response.get("error"), status_code=status.HTTP_400_BAD_REQUEST)

    await save_event_to_db(log_event_response)
    return JSONResponse(log_event_response, status_code=status.HTTP_200_OK)

@router.post("/log_meeting")
async def keyclub_log_meeting(meeting_data: MeetingLoggedRequestModel):
    if meeting_data.api_key != api_key:
        return JSONResponse("invalid api key", status_code=status.HTTP_401_UNAUTHORIZED)

    document_id = meeting_data.link
    first_name_col = meeting_data.first_name_col
    last_name_col = meeting_data.last_name_col
    meeting_length = meeting_data.meeting_length
    meeting_title = meeting_data.title
    log_meeting_response = log_meeting(
        document_id=document_id,
        first_name_col=first_name_col,
        last_name_col=last_name_col,
        meeting_length=meeting_length,
        meeting_title=meeting_title,
        sheets_service=sheets_service
    )

    if log_meeting_response.get("error"):
        return JSONResponse(log_meeting_response.get("error"), status_code=status.HTTP_400_BAD_REQUEST)

    await save_event_to_db(log_meeting_response)
    return JSONResponse(log_meeting_response, status_code=status.HTTP_200_OK)

# ------------------CHECK HOURS API STUFF------------------

@router.get("/update_hours")
async def update_hours():
    global names_hours_list, sheets_service, hours_last_updated
    await update_hours_util(names_hours_list, sheets_service)
    utc_time = datetime.now(timezone(timedelta(hours=-5)))
    hours_last_updated = utc_time.timestamp()
    print("hours updated!")

    return JSONResponse("hours updated!", status_code=status.HTTP_200_OK)

@router.get("/hours_last_updated")
async def update_hours_last_updated():
    global hours_last_updated

    return JSONResponse(hours_last_updated, status_code=status.HTTP_200_OK)

@router.get("/get_hours")
async def get_hours(name: str):
    global names_hours_list
    hours = get_hours_util(names_hours_list, name)

    if hours:
        print(hours)
        return JSONResponse(hours, status_code=status.HTTP_200_OK)
    return JSONResponse("hours not found", status_code=status.HTTP_404_NOT_FOUND)