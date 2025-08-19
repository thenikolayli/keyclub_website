from fastapi import APIRouter, status
from fastapi.responses import JSONResponse

from email.message import EmailMessage
from backend.models import Message
import backend.config as config

import smtplib

router = APIRouter(prefix="/api/email", tags=["email"])

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