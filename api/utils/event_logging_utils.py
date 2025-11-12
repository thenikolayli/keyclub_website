# collection of utility functions used to automatically log events and meetings and check volunteer hours

from googleapiclient.errors import HttpError

from exceptions import SheetFetchError, SheetUpdateError, DocumentFetchError, DocumentTableError, EmptyEventError, \
    DuplicateEventError
from models.event_models import Event
import config

# function that takes in a Google Docs/Sheets url and returns the document_id
def url_to_id(url):
    try:
        return url.split("d/")[1].split("/edit")[0]
    except IndexError:
        try:
            return url.split("id=")[1]
        except IndexError:
            return url

# saves an event or meeting to the database
def save_event_to_db(volunteers, event_title, session):
    # creates db entry
    hours_total = 0
    people_attended = 0

    for volunteer in volunteers:
        people_attended += 1
        hours_total += volunteer.get("hours")

    # creates entry and writes to db
    event_write = Event(
        title=event_title,
        hours_total=hours_total,
        people_attended=people_attended,
    )
    session.add(event_write)
    session.commit()


# function that returns cell values for ranges from the FIRST sheet on the spreadsheet
def fetch_sheet_data(docs_url, ranges, sheets_service):
    document_id = url_to_id(docs_url) # formats document_id

    # obtain spreadsheet metadata and first sheet name
    try:
        sheet_metadata = sheets_service.spreadsheets().get(spreadsheetId=document_id).execute() # attempts to get spreadsheet metadata
    except HttpError:
        raise SheetFetchError("Couldn't fetch sheet.")
    sheet_title = sheet_metadata.get("sheets")[0].get("properties").get("title")  # gets first sheet title, data is read from the first sheet

    # format ranges to read cells from
    for i in range(len(ranges)):
        ranges[i] = f"{sheet_title}!{ranges[i]}"
    # read cells and return what was read
    try:
        result = sheets_service.spreadsheets().values().batchGet(spreadsheetId=document_id, ranges=ranges).execute() # attempts to read cells from ranges
    except HttpError:
        raise SheetFetchError("Couldn't read sheet cells.")

    data = []
    for valueRange in result.get("valueRanges"): # gets cell_range and values in every cell_range
        value = "" if not valueRange.get("values") else valueRange.get("values") # returns value of cell or "" if blank cell
        data.append(value)
    return data

# function that writes values to ranges in a spreadsheet
def write_sheet_data(docs_url, ranges, values, sheets_service):
    document_id = url_to_id(docs_url)  # formats document_id
    data = [{"range": ranges[i], "values": [[values[i]]]} for i in range(len(values))]  # formats ranges and values

    # attempts to write values to ranges in a spreadsheet
    try:
        result = sheets_service.spreadsheets().values().batchUpdate(spreadsheetId=document_id, body={"valueInputOption": "USER_ENTERED", "data": data}).execute()  # writes data
    except HttpError:
        raise SheetUpdateError("Couldn't update sheets")
    return result

# function that returns a dictionary of volunteer names, their sign in, and sign out times from tables within the document
def fetch_docs_data(document_id, docs_service):  # only used for getting stuff from event sign up docs
    document_id = url_to_id(document_id)  # formats document_id

    try:  # attempts to get document info
        document = docs_service.documents().get(documentId=document_id).execute()
    except HttpError:
        raise DocumentFetchError("Couldn't fetch document.")

    body_content = document.get("body").get("content")  # gets body content
    event_title = document.get("title")  # saves title
    volunteers = {}  # volunteer: sign in, sign out, hours
    doc_tables = {}  # dictionary that holds the tables of the document

    # saves all tables to a dictionary, removes the first table
    for item in body_content:
        if "table" in item:
            doc_tables.update({f"table{len(doc_tables) + 1}": list(item.get("table").get("tableRows"))})  # adds tables
    doc_tables.pop("table1") # removes first table, it contains event name, address, etc. (not volunteer info)

    for table in doc_tables:
        row = doc_tables.get(table)
        name_col = ""
        hours_col = ""
        start_col = ""
        end_col = ""

        # finds columns for values like name, hours, sign in/out from the header row in order to know where to read from
        for i in range(len(row[0].get("tableCells"))):
            col = row[0].get("tableCells")[i].get("content")[0].get("paragraph").get("elements")[0].get("textRun").get(
                "content").replace("\n", "").lower()

            match col:  # matches cols
                case "name":
                    name_col = i
                case "hours":
                    hours_col = i
                case "sign in":
                    start_col = i
                case "sign out":
                    end_col = i

        # reads from the rest of the rows
        for i in range(1, len(row)):
            start = ""
            end = ""

            # if sign in/out columns are present, then the event is a standard event and the sign in/out values are read
            # otherwise assume that it is a donation event (ie one clothing item = 30 mins)
            if start_col != "" and end_col != "":
                start = row[i].get("tableCells")[start_col].get("content")[0].get("paragraph").get("elements")[
                    0].get("textRun").get("content").replace("\n", "").lower()
                end = row[i].get("tableCells")[end_col].get("content")[0].get("paragraph").get("elements")[0].get(
                    "textRun").get("content").replace("\n", "").lower()

            # gets the volunteer name and how many hours they got
            name = row[i].get("tableCells")[name_col].get("content")[0].get("paragraph").get("elements")[0].get(
                "textRun").get("content").replace("\n", "").lower()
            hours = row[i].get("tableCells")[hours_col].get("content")[0].get("paragraph").get("elements")[0].get(
                "textRun").get("content").replace("\n", "").lower()

            # saves student data to the volunteers dictionary
            if name != "" and ((start != "" and end != "") or hours != ""):
                # if there is no value for the hours, but values for the sign in and sign out, then the values
                # have not been calculated yet, and the start index for the hours cell is saved,
                # so the hours could be calculated and be written to the index
                if hours == "" and start != "" and end != "":
                    hours = row[i].get("tableCells")[hours_col].get("content")[0].get("paragraph").get("elements")[
                        0].get("startIndex")
                volunteers.update({name: {"hours": hours, "start": start, "end": end}})
    return event_title, volunteers

# function that writes values to ranges in a google document
def write_docs_data(docs_url, ranges, values, docs_service):
    document_id = url_to_id(docs_url) # formats document_id
    correction = 0 # offset per correction (index gets pushed forward for each character written)
    updates = [] # list of updates to write

    # format each value in a way that Google Docs api can understand
    for i in range(len(values)):
        updates.append({"insertText": {"location": {"index": ranges[i] + correction}, "text": values[i]}})
        correction += len(values[i]) # updated the correction to account for new characters written

    # attempts to write to the google doc
    try:
        result = docs_service.documents().batchUpdate(documentId=document_id, body={"requests": updates}).execute()
    except HttpError:
        raise DocumentTableError("Couldn't update document tables.")
    return result

# finds first empty column without an event
def find_empty_col(spreadsheet_id, sheets_service, meeting_title):
    # finding next empty column in the hours spreadsheet to log the event
    event_list = fetch_sheet_data(
        docs_url=spreadsheet_id,
        ranges=[f"K1:ZZ1"],
        sheets_service=sheets_service
    )
    if not event_list:
        raise SheetFetchError("Couldn't fetch sheet data to find empty col.")
    event_list = event_list[0][0]
    empty_event_number = event_list.index("") + 11  # gets first empty col and adds 11 to offset info cols
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    column = ""

    # if event is already in the spreadsheet, quit
    if meeting_title in event_list:
        raise DuplicateEventError("Event is already in the sheet.")

    # accounts for columns that have two letters
    if empty_event_number > len(alphabet):
        column = alphabet[empty_event_number // len(alphabet) - (
                empty_event_number % len(alphabet) == 0) - 1]  # find the first letter and add it
    column += alphabet[empty_event_number % len(alphabet) - 1]  # add the second letter
    return column

# function that takes in a url to a key club sign up google doc, hours multiplier, and credentials
# and logs the event in the hours spreadsheet, and returns a dictionary of volunteers who were and were not logged
def log_event(docs_url, hours_multiplier, sheets_service,  docs_service):
    document_id = url_to_id(docs_url) # formats document_id
    hours_multiplier = float(hours_multiplier) if hours_multiplier != "" else 1 # formats hours multiplier
    event_data = fetch_docs_data(document_id, docs_service) # gets list of volunteers and sign in/out times and hours
    event_title, event_volunteers = event_data

    # check if event has hours filled out on the Google doc
    if not event_volunteers:
        raise EmptyEventError("Event has no volunteers.")

    # if the first volunteer doesn't have hours calculated, assume that the entire list of volunteers doesn't have
    # their hours calculated either, therefore calculate hours for all the volunteers
    # this is checked by checking if the hours value of the first volunteer is an int or a string, int if not calculated
    # because it will be set to the index of the hours cell of the doc for that volunteer
    if isinstance(event_volunteers.get(list(event_volunteers)[0]).get("hours"), int):
        ranges = []
        values = []

        # calculates hours for each volunteer
        for name in event_volunteers:
            start = [int(x) for x in event_volunteers.get(name).get("start").split(":")]  # splits hours and minutes
            end = [int(x) for x in event_volunteers.get(name).get("end").split(":")]  # splits hours and minutes
            index = event_volunteers.get(name).get("hours")  # saves index

            # accounts for events that cross 12 o clock
            if start[0] > end[0]:
                end[0] += 12

            # calculates hours
            hours = str(round((((end[0] * 60 + end[1]) - (start[0] * 60 + start[1])) / 60) * hours_multiplier, 2))

            ranges.append(index)
            values.append(hours)
            event_volunteers.get(name).update({"hours": hours}) # updates hours on event volunteers dictionary

        # since hours have been calculated, it resets the hours multiplier to prevent it from multiplying the hours twice
        hours_multiplier = 1
        # writes calculated hours to the event sign up document
        write_docs_data(docs_url=document_id, ranges=ranges, values=values, docs_service=docs_service)

    column = find_empty_col(config.spreadsheet_id, sheets_service, event_title)
    # find ranges and values and log
    all_rows = fetch_sheet_data(
        docs_url=config.spreadsheet_id,
        ranges=[config.spreadsheet_ranges[0], config.spreadsheet_ranges[1]],
        sheets_service=sheets_service
    )

    nicknames = all_rows[1] # nickname rows
    fullnames = all_rows[0] # full name rows

    # goes through the list of nicknames and creates full names by combining nickname and last name
    for i in range(len(nicknames)):
        if nicknames[i]:
            nickname = f"{fullnames[i][0].split(', ')[0].strip()}, {nicknames[i][0].strip()}"
            nicknames[i] = nickname.lower()
    for i in range(len(fullnames)):
        fullnames[i] = fullnames[i][0].lower()

    # ranges and values to log in the spreadsheet
    volunteer_ranges = [f"{column}1:{column}1"]
    volunteer_values = [event_title]
    volunteers = []

    # preps ranges and values to write to for the hours spreadsheet
    for name in event_volunteers:
        try:
            first, last = name.split(" ")
            fullname = f"{last}, {first}"
        except ValueError:
            fullname = name

        # if fullname is not in fullnames or nicknames, skip and add to unlogged
        # add 2 to account for starting on 2nd row and Python starting lists on 0
        if fullname in fullnames:
            row = fullnames.index(fullname) + 2
        elif fullname in nicknames:
            row = nicknames.index(fullname) + 2
        else:
            volunteers.append({
                "name": fullname,
                "hours": float(event_volunteers.get(name).get("hours")) * hours_multiplier,
                "logged": False
            })
            continue

        volunteer_ranges.append(f"{column}{row}:{column}{row}")
        volunteer_values.append(float(event_volunteers.get(name).get("hours")) * hours_multiplier)
        volunteers.append({
            "name": fullname,
            "hours": float(event_volunteers.get(name).get("hours")) * hours_multiplier,
            "logged": True
        })

    # logs hours to hours spreadsheet
    write_sheet_data(docs_url=config.spreadsheet_id,
                      ranges=volunteer_ranges,
                      values=volunteer_values,
                      sheets_service=sheets_service)
    return volunteers, event_title


def log_meeting(document_id, first_name_col, last_name_col, meeting_length, meeting_title, sheets_service):
    document_id = url_to_id(document_id) # formats document_id
    event_volunteers = {}
    first_name_col = first_name_col.upper()
    last_name_col = last_name_col.upper()
    meeting_length = float(meeting_length)

    # adds volunteers and hours to volunteer dict
    if last_name_col != "":
        event_data = fetch_sheet_data(docs_url=document_id,
                                      ranges=[f"{first_name_col}:{first_name_col}",
                                              f"{last_name_col}:{last_name_col}"],
                                      sheets_service=sheets_service)  # fetches meeting data

        # formats results
        first_names = event_data[0]
        last_names = event_data[1]

        for i in range(1, len(first_names)): # goes through all names skipping header row
            name = f"{first_names[i][0]} {last_names[i][0]}".lower().strip() # formats name
            if not name in event_volunteers: # filter out duplicates (if people filled out the attendance form more than once)
                event_volunteers.update({name: {"hours": round(meeting_length / 60, 2)}}) # adds to volunteer dict
    else: # if last name col not given, assume first name col contains full names
        event_data = fetch_sheet_data(docs_url=document_id,
                                      ranges=[f"{first_name_col}:{first_name_col}"],
                                      sheets_service=sheets_service)

        event_data = event_data[0] # formats result
        event_data.pop(0) # removes header row

        # adds volunteers to volunteer dictionary
        for name in event_data:
            if not name[0].lower().strip() in event_volunteers: # filter out duplicates (if people filled out the attendance form more than once)
                event_volunteers.update({name[0].lower().strip(): {"hours": round(meeting_length / 60, 2)}})

    column = find_empty_col(config.spreadsheet_id, sheets_service, meeting_title)
    # find ranges and values and log
    all_rows = fetch_sheet_data(
        docs_url=config.spreadsheet_id,
        ranges=[config.spreadsheet_ranges[0], config.spreadsheet_ranges[1]],
        sheets_service=sheets_service
    )

    nicknames = all_rows[1]  # nickname rows
    fullnames = all_rows[0]  # full name rows

    # goes through the list of nicknames and creates full names by combining nickname and last name
    for i in range(len(nicknames)):
        if nicknames[i]:
            nickname = f"{fullnames[i][0].split(', ')[0].strip()}, {nicknames[i][0].strip()}"
            nicknames[i] = nickname.lower()
    for i in range(len(fullnames)):
        fullnames[i] = fullnames[i][0].lower()

    # ranges and values to log in the spreadsheet
    volunteer_ranges = [f"{column}1:{column}1"]
    volunteer_values = [meeting_title]
    volunteers = []

    # preps ranges and values to write to for the hours spreadsheet
    for name in event_volunteers:
        try:
            first, last = name.split(" ")
            fullname = f"{last}, {first}"
        except ValueError:
            fullname = name

        # if fullname is not in fullnames or nicknames, skip and add to unlogged
        # add 2 to account for starting on 2nd row and Python starting lists on 0
        if fullname in fullnames:
            row = fullnames.index(fullname) + 2
        elif fullname in nicknames:
            row = nicknames.index(fullname) + 2
        else:
            volunteers.append({
                "name": fullname,
                "hours": float(event_volunteers.get(name).get("hours")),
                "logged": False
            })
            continue

        volunteer_ranges.append(f"{column}{row}:{column}{row}")
        volunteer_values.append(float(event_volunteers.get(name).get("hours")))
        volunteers.append({
            "name": fullname,
            "hours": float(event_volunteers.get(name).get("hours")),
            "logged": True
        })

    # logs hours to hours spreadsheet
    write_sheet_data(docs_url=config.spreadsheet_id,
                     ranges=volunteer_ranges,
                     values=volunteer_values,
                     sheets_service=sheets_service)
    return volunteers