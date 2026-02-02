# utility functions for main.py
from datetime import datetime, timedelta, timezone
from utils.event_logging_utils import url_to_id
import requests, logging, re, config

from googleapiclient.errors import HttpError
from exceptions import DocumentFetchError, DocumentTableError, DocumentIncompleteTableError, InstagramPostError

from sqlmodel import Session, select
from database import engine
from models.reminds_models import CurrentEvent, EventInfo, PostEvent

# returns the event priority based on fullness of sign up sheet
def get_event_priority(docs_url):
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
    fullness = volunteers / (volunteers + empty)

    if fullness > .75:
        return
    elif fullness <= .25:
        return "High Priority!!!"
    elif fullness <= .5:
        return "Medium Priority!!"
    elif fullness <= .75:
        return "Low Priority!!"

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
def get_event_info(url, description, post_type):
    # gets document
    document_id = url_to_id(url)
    try:
        document = config.docs_service.documents().get(documentId=document_id).execute()
    except HttpError as e:
        logging.info(f"Failed to fetch document to get event info: {document_id}.")
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

        # gets ALL the text including hyperlinks, no link addresses though
        event_location_elements = info_table_rows[3].get("tableCells")[1].get("content")[0].get("paragraph").get("elements")
        event_location = "".join(
            element.get("textRun").get("content") for element in event_location_elements if "textRun" in element and "content" in element.get("textRun")
        )
        event_priority = get_event_priority(url)
    except AttributeError:
        raise DocumentIncompleteTableError("Metadata table is incomplete.")

    return EventInfo(
        post_type=post_type,
        title=event_title,
        description=description,
        time=event_time,
        date=event_date,
        location=event_location,
        priority=event_priority,
        url=url
    )

# returns whether or not an event has been posted before
def in_current_events(event_title, event_date):
    with Session(engine) as session:
        event_found = session.exec(select(CurrentEvent).where(CurrentEvent.title == event_title, CurrentEvent.date == event_date)).first()
        if event_found:
            return True
    return False

# adds an event to the log
def add_to_current_events(event_title, event_date):
    with Session(engine) as session:
        new_event = CurrentEvent(
            title = event_title,
            date = event_date
        )
        session.add(new_event)
        session.commit()
    logging.info(f"Added {event_title} to current events")

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

        return_events.append(PostEvent(
            description=event_description,
            url=event_url,
            post_type=None,
        ))
    logging.info(f"Fetched {len(return_events)} new events")
    return return_events

# posts an event to instagram
def post_event(event: PostEvent):
    event_info: EventInfo = get_event_info(event.url, event.description, event.post_type)

    # event_info returns None if event is more than 75% full
    if not event_info.priority or in_current_events(event_info.title, event_info.date):
        logging.info(f"Skipped {event_info.title}, enough members or already posted")
        return
    add_to_current_events(event_info.title, event_info.date)

    # note to self: add a config variable for this...
    response = requests.post(config.discord_bot_url + "/post_event", json=event_info.model_dump())
    if response.status_code != 200:
        logging.info(f"Failed to post {event_info.title} to discord.")

    logging.info(f"Successfully posted {event_info.title}")

# main loop
async def main():
    events = get_events(config.calendar_service, config.calendar_id)
    for event in events:
        try:
            post_event(event)
        except Exception as e:
            logging.info(str(e))