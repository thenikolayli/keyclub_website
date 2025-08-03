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
- .env - environment variables (change some during production)
- key.json - credentials for logging into the Key Club service account, it's the account that logs hours and sends emails and such
- docker-compose.yml - learn about Docker and containerization
- \_\_init__.py - im not sure myself, but it helps Python find files using absolute paths

## How to run this???
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

## Phone design progress
- [x] Home
- [x] About
- [x] Events
- [ ] District Project
- [ ] Hour Checker
- [x] Membership
- [ ] Gallery
- [x] Contact Us