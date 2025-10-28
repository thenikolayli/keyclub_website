# utility functions for main.py
from PIL import Image, ImageFont
from pilmoji import Pilmoji
from datetime import datetime, timedelta, timezone
from cloudinary import uploader as cloudinary_uploader
from api.utils.event_logging_utils import url_to_id
import requests, logging, re
import api.config as config

from googleapiclient.errors import HttpError
from api.exceptions import DocumentFetchError, DocumentTableError, DocumentIncompleteTableError

from sqlmodel import Session, select
from api.database import engine
from api.models.reminds_models import CurrentEvent

middle = 1080 // 2
left = 120
width = 1080 - (left * 2)

post_type_y_start = 100
post_type_y_end = 220
title_y_start = post_type_y_end
title_y_end = 400
description_y_start = title_y_end + 30
description_y_end = 900
info_y_start = description_y_end
info_y_end = 1100

# breaks text into lines to fit max_width
def break_text(text, font, max_width):
    words = text.split()
    lines = []
    line = ""
    broken_text = ""

    for index in range(len(words)):
        word = words[index]
        # if line isn't blank, add on to it, otherwise start it with the current word
        if line:
            temp_line = line + " " + word
        else:
            temp_line = word

        # check if the line fits within the width
        temp_bbox = font.getbbox(temp_line)
        temp_line_width = temp_bbox[2] - temp_bbox[0]
        # if new line is too wide or has a special emoji, start a new line, otherwise continue
        if temp_line_width > max_width or words[index] in ["📅", "⌚", "📍"]:
            lines.append(line)
            line = word
        else:
            line = temp_line
    # appends last line if there is one
    lines.append(line)
    for line in lines:
        broken_text += line + "\n"
    return broken_text

# fits text into max_width and max_height to have biggest font size, returns text string and font size
def fit_text(text, max_width, max_height, size = 2, max_size = 100):
    font = ImageFont.truetype(config.font_path, size)
    temp_text = break_text(text, font, max_width)
    ascend, descent = font.getmetrics()
    temp_text_line_height = ascend + descent
    temp_text_height = temp_text_line_height * temp_text.count("\n")

    # if the text is too tall or the size is beyond the limit, decrement it and return, otherwise increment and rerun
    if temp_text_height > max_height or size > max_size:
        size -= 2
        font = ImageFont.truetype(config.font_path, size)
        return break_text(text, font, max_width), size
    else:
        return fit_text(text, max_width, max_height, size + 2, max_size)

# returns the fullness of an event -> volunteers_signed_up / total_spots
def get_event_fullness(docs_url):
    docs_id = url_to_id(docs_url)
    try:
        document = config.docs_service.documents().get(documentId=docs_id).execute()
    except HttpError:
        raise DocumentFetchError(f"Error fetching document to check fullness: {docs_id}")
    body_content = document.get("body").get("content")
    tables = []
    rows = []
    volunteers = 0
    empty = 0

    # gets all tables from sign up doc, removes first because its the metadata table
    for item in body_content:
        if "table" in item:
            table = item.get("table")
            tables.append(table)
    tables.pop(0)

    # gets rows from each table and appends them, removes 1st because its the header row
    for table in tables:
        rows.extend(table.get("tableRows", []))
    rows.pop(0)

    # checks if the first cell of each row is \n, if yes then its empty, otherwise theres a volunteer
    for row in rows:
        try:
            content = row.get("tableCells")[1].get("content")[0].get("paragraph").get("elements")[0].get("textRun").get("content")

            if content == "\n":
                empty += 1
            else:
                volunteers += 1
        except AttributeError: pass
    return volunteers / (volunteers + empty)

# formats datetime to remove the seconds column and adds the period
def format_time(datetime_param):
    datetime_param = datetime.fromisoformat(datetime_param).time()
    period = datetime_param.strftime("%p")

    # converts it to 12 hour time
    hour, minute = datetime_param.hour, datetime_param.minute
    if hour > 12:
        hour -= 12
    hour = str(hour)
    # if the minute is single digit
    if minute < 10:
        minute = "0" + str(minute)
    minute = str(minute)
    datetime_param = f"{hour}:{minute} {period}"
    return datetime_param

# returns title, date, time, location, and fullness via the sign up sheet url
def get_event_info(url):
    # gets document
    document_id = url_to_id(url)
    try:
        document = config.docs_service.documents().get(documentId=document_id).execute()
    except HttpError as e:
        logging.error(f"Failed to fetch document to get event info: {document_id}.")
        raise DocumentFetchError(f"Error fetching document: {e}")

    # finds metadata table (always the first table)
    body_content = document.get("body").get("content")
    info_table_rows = None
    for item in body_content:
        if "table" in item:
            info_table_rows = item.get("table").get("tableRows")
            break
    if not info_table_rows:
        raise DocumentTableError("Document has no tables.")

    try:
        event_title = info_table_rows[0].get("tableCells")[1].get("content")[0].get("paragraph").get("elements")[0].get(
            "textRun").get("content")
        event_date = info_table_rows[1].get("tableCells")[1].get("content")[0].get("paragraph").get("elements")[0].get(
            "textRun").get("content")
        event_time = info_table_rows[2].get("tableCells")[1].get("content")[0].get("paragraph").get("elements")[0].get(
            "textRun").get("content")
        event_location = info_table_rows[3].get("tableCells")[1].get("content")[0].get("paragraph").get("elements")[
            0].get("textRun").get("content")
        event_fullness = get_event_fullness(url)
    except AttributeError:
        raise DocumentIncompleteTableError("Metadata table is incomplete.")

    event_title.replace("\n", "")
    return event_title, event_date, event_time, event_location, event_fullness

# returns whether or not an event has been posted before
def in_current_events(event_title, event_date):
    with Session(engine) as session:
        event_found = session.exec(select(CurrentEvent).where(CurrentEvent.title == event_title, CurrentEvent.date == event_date)).first()
        if event_found:
            return True
    return False

# updates the log and removes passed events
def update_current_events():
    today = datetime.now(timezone.utc)

    with Session(engine) as session:
        current_events = session.exec(select(CurrentEvent).where(CurrentEvent.cloudinary_deleted == False)).all()
        for event in current_events:
            if event.delete_date < today:
                cloudinary_uploader.destroy(event.cloudinary_public_id)
                logging.info(f"Removed {event.title} from current events")
                event.cloudinary_deleted = True
                session.add(event)
                session.commit()
    logging.info("Updated current events")

# adds an event to the log
def add_to_current_events(event_title, event_date, event_cloudinary_public_id):
    with Session(engine) as session:
        new_event = CurrentEvent(
            title = event_title,
            date = event_date,
            cloudinary_public_id = event_cloudinary_public_id,
        )
        session.add(new_event)
        session.commit()
    logging.info(f"Added {event_title} to current events")

# generates a png with event info
def fill_template(post_type, title, description, time, date, location, priority = None):
    global middle, left, width, post_type_y_start, post_type_y_end, title_y_start, title_y_end, description_y_start, description_y_end, info_y_start, info_y_end
    image = Image.open(config.reminds_template).convert("RGB")
    start_time, end_time = time.split("-")
    info = f"📅 {date} ⌚ From {start_time} to {end_time} 📍 {location}"
    if priority:
        post_type = f"{post_type}: {priority}"

    post_type, post_type_font_size = fit_text(post_type, width, post_type_y_end - post_type_y_start)
    post_type_font = ImageFont.truetype(config.font_path, post_type_font_size)
    title, title_font_size = fit_text(title, width, title_y_end - title_y_start)
    title_font = ImageFont.truetype(config.font_path, title_font_size)
    description_max_font_size = title_font_size if title_font_size - 15 <= 2 else title_font_size - 15
    description, description_font_size = fit_text(description, width, description_y_end - description_y_start, max_size=description_max_font_size)
    description_font = ImageFont.truetype(config.font_path, description_font_size)
    info, info_font_size = fit_text(info, width, title_y_end - title_y_start)
    info_font = ImageFont.truetype(config.font_path, info_font_size)

    with Pilmoji(image) as pilmoji:
        pilmoji.text((middle, post_type_y_start), post_type, font=post_type_font, fill="black", anchor="ma")
        pilmoji.text((middle, title_y_start), title, font=title_font, fill="black", anchor="ma")
        pilmoji.text((left, description_y_start), description, font=description_font, fill="black", anchor="la")
        pilmoji.text((left, info_y_start), info, font=info_font, fill="black", anchor="la")

    # lines for deciding starting and ending y positions
    # draw.rectangle((left, post_type_y_start, left + width, post_type_y_end), None, "red", width=1)
    # draw.rectangle((left, title_y_start, left + width, title_y_end), None, "blue", width=1)
    # draw.rectangle((left, description_y_start, left + width, description_y_end), None, "orange", width=1)
    # draw.rectangle((left, info_y_start, left + width, info_y_end), None, "black", width=1)

    return image

# creates a container and posts it to instagram
def post_to_instagram(caption, image_url, fb_token):
    response = requests.post(
        f"https://graph.instagram.com/v23.0/me/media",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {fb_token}",
        },
        data={
            "image_url": image_url,
            "caption": caption
        }
    )

    if response.status_code == 200:
        container_id = response.json()["id"]

        requests.post(
            f"https://graph.instagram.com/v23.0/me/media_publish",
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {fb_token}",
            },
            data={
                "creation_id": container_id,
            }
        )
        return container_id

# returns a list of upcoming events that should be posted in the next 7 days
def get_events(calendar_service, calendar_id):
    today = datetime.now(timezone.utc).isoformat()
    week = (datetime.now(timezone.utc) + timedelta(days=7)).isoformat()
    all_events = calendar_service.events().list(calendarId=calendar_id, timeMin=today, timeMax=week).execute()
    all_events = all_events.get("items", [])
    return_events = []

    for event in all_events:
        # skip if no google doc attached to event
        if not event.get("attachments"): continue

        event_url = event.get("attachments")[0].get("fileUrl")
        event_description = event.get("description")
        if event_description:
            clean = re.compile("<[^>]+>")
            event_description = re.sub(clean, "", event_description)
        else:
            event_description = "No description, check the sign up Google Doc for info!"

        return_events.append({
            "event_description": event_description,
            "event_url": event_url,
        })
    logging.info(f"Fetched {len(return_events)} new events")
    return return_events

# posts an event to instagram
def post_event(docs_url, event_description, post_type="Volunteers Needed"):
    event_title, event_date, event_time, event_location, event_fullness = get_event_info(docs_url)
    event_priority = ""
    if event_fullness > .75 or in_current_events(event_title, event_date):
        logging.info(f"Skipped {event_title}, enough members or already posted")
        return
    elif event_fullness <= .25:
        event_priority = "High Priority!!!"
    elif event_fullness <= .5:
        event_priority = "Medium Priority!!"
    elif event_fullness <= .75:
        event_priority = "Low Priority!"

    image = fill_template(
        post_type = post_type,
        title = event_title,
        description = event_description,
        time = event_time,
        date = event_date,
        location = event_location,
        priority = event_priority,
    )
    image.save(config.image_save_path)

    upload_result = cloudinary_uploader.upload(file=config.image_save_path, return_delete_token=True)
    public_id, secure_url = upload_result.get("public_id"), upload_result.get("secure_url")
    post_to_instagram(
        caption=f"{event_title}\n\n{event_description}\n\n{docs_url}",
        image_url=secure_url,
        fb_token=config.fb_token,
    )
    add_to_current_events(event_title, event_date, public_id)
    logging.info(f"Successfully posted {event_title}")

# main loop
async def main():
    update_current_events()
    events = get_events(config.calendar_service, config.calendar_id)
    for event in events:
        try:
            post_event(
                docs_url=event.get("event_url"),
                event_description=event.get("event_description"),
            )
        except Exception as e:
            logging.error(e)