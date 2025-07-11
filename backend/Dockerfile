FROM python:alpine

# copies files and sets up environment
COPY . /app
WORKDIR /app
RUN apk update && apk add python3 py3-pip py3-virtualenv && pip install pipenv && pipenv install --ignore-pipfile