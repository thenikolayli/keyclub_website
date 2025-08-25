# Website for the JHS Key Club 25-26

This is the website for the JHS Key Club.

## Files
Here's the explanations for what everything is
- `.env` - environment variables (change some during production)
- `key.json` - credentials for logging into the Key Club service account, it's the account that logs hours and sends emails and such
- `docker-compose.yml` - learn about Docker and containerization
- `\_\_init__.py` - it helps Python find files using absolute paths by seeing directories and modules

## Instructions

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
### *starting the frontend dev vite server*
```
/frontend> npm run dev
```
