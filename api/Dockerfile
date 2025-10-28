FROM python:3.13-alpine

# copies files and sets up environment
COPY . /api
COPY Pipfile /
COPY Pipfile.lock /
RUN apk update && apk add python3-dev py3-pip py3-virtualenv build-base libffi-dev && pip install pipenv && pipenv install --ignore-pipfile