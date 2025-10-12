from urllib import request as urllib_request
from concurrent.futures import ThreadPoolExecutor

from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

import api.config as config
import os, random

router = APIRouter(prefix="/api/gallery", tags=["gallery"])


# gets a list of photos from the google drive
def get_photos_recursive(folder_id):
    image_file_ids = []
    result = config.drive_service.files().list(
        q=f"'{folder_id}' in parents and trashed = false",
        pageSize=1000
    ).execute()

    for file in result["files"]:
        if file["mimeType"] in config.image_mimeTypes:
            image_file_ids.append(f"https://lh3.googleusercontent.com/d/{file["id"]}=w1000?authuser=0")  # adds image file id to the list
        elif file["mimeType"] == config.folder_mimeType:
            image_file_ids.extend(
                get_photos_recursive(file["id"]))  # adds the return of the function for each subfolder id
    return image_file_ids

# downloads a photo on the url
def download_photo(url, index):
    urllib_request.urlretrieve(url, f"{config.photos_path}/photo_{index}.png")

# downloads all photos from the google drive
@router.get("/update_photos")
async def update_photos():
    # deletes old photos
    for file in os.listdir(config.photos_path):
        file_path = os.path.join(config.photos_path, file)
        os.remove(file_path)

    # downloads new photos
    photo_urls = get_photos_recursive(config.photos_folder_id)
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = [executor.submit(download_photo, photo_urls[index], index) for index in range(len(photo_urls))]

        # waits for everything to download
        for future in futures:
            future.result()

    return JSONResponse("Photos updated", status_code=status.HTTP_200_OK)

# returns an array of random photo urls
@router.get("/get_photos")
async def get_photos(count: int = 20):
    file_list = [each for each in os.listdir(config.photos_path) if os.path.isfile(os.path.join(config.photos_path, each))]
    photo_list = []

    while len(photo_list) < count:
        choice = random.choice(file_list)
        photo_list.append(f"/gallery/{choice}")
        file_list.remove(choice)

    return photo_list