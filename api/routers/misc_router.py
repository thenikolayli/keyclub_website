from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse

from sqlmodel import select
from email.message import EmailMessage
from api.models.misc_models import Message, Banner
from api.utils.auth_utils import require_admin
import api.config as config
import api.database as database

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
async def update_banner(banner: Banner, session = Depends(database.get_session)):
    selected_banner = session.exec(select(Banner)).first()
    selected_banner.message = banner.message
    selected_banner.show = banner.show
    session.add(selected_banner)
    session.commit()

    return JSONResponse("Banner updated", status_code=status.HTTP_200_OK)

# returns banner info
@router.get("/get_banner")
async def get_banner(session = Depends(database.get_session)):
    selected_banner = session.exec(select(Banner)).first()
    return JSONResponse(selected_banner.model_dump(mode="json"), status_code=status.HTTP_200_OK)