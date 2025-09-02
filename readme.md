# Website for the JHS Key Club 25-26

This is the website for the JHS Key Club.

## Webmaster requirements/recommended knowledge. 
This is the stuff the webmaster should know in order 
to be able to manage and work with this effectively.
- FastAPI
- SolidJS
- Nginx
- MongoDB
- Docker
- Containerization
- VPS (Virtual Private Server)
- Website Hosting

## What's what?
Here's the explanations for what everything is
- `.env` - environment variables (change some during production)
- `key.json` - credentials for logging into the Key Club service account, it's the account that logs hours and sends emails and such
- `docker-compose.yml` - learn about Docker and containerization
- `\_\_init__.py` - lets Python see directories as modules
- `banner.json` - JSON file that stores info on the banner, primarily for next meeting info

## How to run this?
Here are the instructions on how to do various things.

### *setting up the virtual environments*
```
/backend> pipenv install
/frontend> npm i
```
### *entering the shell and starting the backend ASGI server*
```
/backend> pipenv shell
/> uvicorn backend.main:app
```
### *starting the frontend dev vite server:*
```
/frontend> npm run dev
```

## How will photo forms work?
- Refresh button to fetch new form responses
- - Saved form responses to db as unresolved
- - If it's already in the DB (based on name), skip it
- Opening the form will show the info (full name, email, event name, and photos)
- Then you can accept/reject it
- Yk what else

events will be saved in the db as well as photo forms