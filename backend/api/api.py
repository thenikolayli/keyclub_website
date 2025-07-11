import smtplib, json, random, urllib, os
from concurrent.futures import ThreadPoolExecutor
from email.message import EmailMessage
from pathlib import Path

from fastapi import APIRouter, status
from fastapi.responses import JSONResponse, Response

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
keyjson_path = str((Path(__file__).parent / "../key.json").resolve())
credentials = Credentials.from_service_account_file(keyjson_path, scopes=SCOPES)
service = build("drive", "v3", credentials=credentials)
folder_mimeType = 'application/vnd.google-apps.folder'
image_mimeTypes = ["image/jpeg", "image/png", "image/webp", "image/heif"]


def get_photos_recursive(folder_id):
    image_file_ids = []
    result = service.files().list(
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
    urllib.request.urlretrieve(url, f"photos/photo_{index}.png")


# sends a message to the gmail
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

# downloads all photos from the google drive
@router.get("/update_photos")
async def update_photos():
    global PHOTOS_FOLDER_ID

    # deletes old photos
    for file in os.listdir("photos"):
        file_path = os.path.join("photos", file)
        os.remove(file_path)

    # downloads new photos
    photo_urls = get_photos_recursive(PHOTOS_FOLDER_ID)
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(download_photo, photo_urls[index], index) for index in range(len(photo_urls))]

        # waits for everything to download
        for future in futures:
            future.result()

    return JSONResponse("Photos updated", status_code=status.HTTP_200_OK)

# returns an array of random photo urls
@router.get("/get_photos")
async def get_photos(count: int = 20):
    file_list = [each for each in os.listdir("photos") if os.path.isfile(os.path.join("photos", each))]
    photo_list = []

    while len(photo_list) < count:
        choice = random.choice(file_list)
        photo_list.append(f"/photos/{choice}")
        file_list.remove(choice)

    return photo_list