import json
from os import getenv
from dotenv import load_dotenv

from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build

load_dotenv()

SCOPES = json.loads(getenv("API_SCOPES"))
PHOTOS_FOLDER_ID = getenv("PHOTOS_FOLDER_ID")
credentials = Credentials.from_service_account_file("../key.json", scopes=SCOPES)
service = build("drive", "v3", credentials=credentials)
folder_mimeType = 'application/vnd.google-apps.folder'
image_mimeTypes = ["image/jpeg", "image/png", "image/webp", "image/heif"]

def get_images_recursive(folder_id):
    image_file_ids = []
    result = service.files().list(
        q=f"'{folder_id}' in parents and trashed = false",
        pageSize=1000
    ).execute()

    for file in result["files"]:
        if file["mimeType"] in image_mimeTypes:
            image_file_ids.append(file["id"]) # adds image file id to the list
        elif file["mimeType"] == folder_mimeType:
            image_file_ids.extend(get_images_recursive(file["id"])) # adds the return of the function for each subfolder id
    return image_file_ids


for image_id in get_images_recursive(PHOTOS_FOLDER_ID):
    print(f"https://drive.google.com/thumbnail?id={image_id}")

# print(len(get_images_recursive(PHOTOS_FOLDER_ID)))