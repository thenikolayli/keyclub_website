import base64, smtplib, json
from email.message import EmailMessage

from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from .models import Message
from os import getenv
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="", tags=["api"])
keyclub_email = getenv("KEYCLUB_EMAIL")
app_password = getenv("APP_PASSWORD")

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