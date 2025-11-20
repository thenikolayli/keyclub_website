import asyncio
from datetime import datetime

import config
import database
from models.hours_models import Hours
from sqlmodel import Session, select


# updates the hours list by fetching hours from the spreadsheet
async def update_hours_list():
    with Session(database.engine) as session:
        # fetches new hours data
        names_hours_data_request = await asyncio.to_thread(
            config.sheets_service.spreadsheets().values().batchGet,
            spreadsheetId=config.spreadsheet_id,
            ranges=[
                config.names_col,
                config.nicknames_col,
                config.year_col,
                config.term_hours_col,
                config.all_hours_col,
            ],
        )
        names_hours_data = names_hours_data_request.execute()
        loop_range = len(
            names_hours_data.get("valueRanges")[0].get("values")
        )  # to be able to try and get corresponding values in the row

        # adds each name to db
        for i in range(loop_range):
            try:
                name = names_hours_data.get("valueRanges")[0].get("values")[i][0]
                try:
                    nickname = names_hours_data.get("valueRanges")[1].get("values")[i][
                        0
                    ]
                except IndexError:
                    nickname = ""
                grad_year = int(
                    names_hours_data.get("valueRanges")[2].get("values")[i][0]
                )
                term_hours = float(
                    names_hours_data.get("valueRanges")[3].get("values")[i][0]
                )
                all_hours = float(
                    names_hours_data.get("valueRanges")[4].get("values")[i][0]
                )
            # if a person doesn't have any of these values besides the nickname, skip them
            except IndexError:
                continue

            # if an entry for this person exists, update it, otherwise make an entry for them
            hours_write = session.exec(select(Hours).where(Hours.name == name)).first()
            if hours_write:
                hours_write.nickname = nickname
                hours_write.term_hours = term_hours
                hours_write.all_hours = all_hours
                hours_write.grad_year = grad_year
            else:
                hours_write = Hours(
                    name=name,
                    nickname=nickname,
                    grad_year=grad_year,
                    term_hours=term_hours,
                    all_hours=all_hours,
                )
            session.add(hours_write)
            session.commit()
    config.hours_last_updated = datetime.now().timestamp()


# gets the hours for a person based on their name
def get_hours(session, name):
    name = name.lower()

    # finds the "First, Last", "Last, First", and "Nickname" variations and formats them to "First, Last" or "Nickname"
    try:
        first, last = name.split(" ")
        first = first.capitalize()
        last = last.capitalize()

        # two different configs because some people put last name first
        last_first = f"{last}, {first}"
        first_last = f"{first}, {last}"

        hours = session.exec(select(Hours).where(Hours.name == last_first)).first()
        if hours:
            return hours
        # returns first_last hours or None if nothing is found
        return session.exec(select(Hours).where(Hours.name == first_last)).first()
    except ValueError:
        # if only the nickname was given
        name = name.capitalize()
        hours = session.exec(select(Hours).where(Hours.nickname == name)).first()
        if hours:
            return hours
        return session.exec(select(Hours).where(Hours.name.contains(name))).first()
