from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse

from email.message import EmailMessage
from backend.models import Message, SetBanner
from backend.routers.auth import require_admin
import backend.config as config

import smtplib, json

router = APIRouter(prefix="/api/misc", tags=["misc"])

# sends a message to the gmail
@router.post("/message")
async def message(email_message: Message):
    email = EmailMessage()
    email["To"] = config.keyclub_email
    email["From"] = config.keyclub_email
    email["Subject"] = f"Website Message from {email_message.first_name} {email_message.last_name}"
    email.set_content(f"Contact: {email_message.email}\n\n{email_message.message}")

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login(config.keyclub_email, config.app_password)
        smtp.send_message(email)

    return JSONResponse("Message Sent", status_code=status.HTTP_200_OK)

# sets banner info
@router.post("/update_banner", dependencies=[Depends(require_admin)])
async def update_banner(banner: SetBanner):
    with open(config.banner_json_path, "w") as file:
        json.dump(banner.model_dump(), file)
    return JSONResponse("Banner updated", status_code=status.HTTP_200_OK)

# returns banner info
@router.get("/get_banner")
async def get_banner():
    with open(config.banner_json_path, "r") as file:
        banner = json.load(file)
    return JSONResponse(banner, status_code=status.HTTP_200_OK)