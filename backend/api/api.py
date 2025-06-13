import smtplib, json, random
from email.message import EmailMessage

from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from .models import Message
from os import getenv
from dotenv import load_dotenv

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

load_dotenv()

router = APIRouter(prefix="", tags=["api"])
keyclub_email = getenv("KEYCLUB_EMAIL")
app_password = getenv("APP_PASSWORD")

SCOPES = json.loads(getenv("API_SCOPES"))
PHOTOS_FOLDER_ID = getenv("PHOTOS_FOLDER_ID")
credentials = Credentials.from_service_account_file("../key.json", scopes=SCOPES)
service = build("drive", "v3", credentials=credentials)
folder_mimeType = 'application/vnd.google-apps.folder'
image_mimeTypes = ["image/jpeg", "image/png", "image/webp", "image/heif"]


@router.post("/message")
async def message(message: Message):
    email = EmailMessage()
    email["To"] = keyclub_email
    email["From"] = keyclub_email
    email["Subject"] = f"Website Message from {message.first_name} {message.last_name}"
    email.set_content(f"Contact: {message.contact}\n\n{message.message}")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(keyclub_email, app_password)
        smtp.send_message(email)

    return JSONResponse("Message Sent", status_code=status.HTTP_200_OK)

@router.get("/update_photos")
async def update_photos():
    global PHOTOS_FOLDER_ID

    photo_urls = get_photos_recursive(PHOTOS_FOLDER_ID)
    with open("photo_urls.json", "w") as file:
        json.dump(photo_urls, file)
    return JSONResponse("Photos Updated", status_code=status.HTTP_200_OK)

@router.get("/get_photos")
async def get_photos(count: int = 20):
    photo_list = []

    with open("photo_urls.json", "r") as file:
        photo_urls = json.load(file)

        while len(photo_list) < count:
            photo = random.choice(photo_urls)
            if not photo in photo_list:
                photo_list.append(photo)
    return photo_list

def get_photos_recursive(folder_id):
    image_file_ids = []
    result = service.files().list(
        q=f"'{folder_id}' in parents and trashed = false",
        pageSize=1000
    ).execute()

    for file in result["files"]:
        if file["mimeType"] in image_mimeTypes:
            image_file_ids.append(f"https://drive.google.com/thumbnail?id={file["id"]}&sz=w1000")  # adds image file id to the list
        elif file["mimeType"] == folder_mimeType:
            image_file_ids.extend(
                get_photos_recursive(file["id"]))  # adds the return of the function for each subfolder id
    return image_file_ids