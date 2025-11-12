FROM python:3.13-slim AS build

RUN apt-get update && apt-get install -y --no-install-recommends build-essential libffi-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY Pipfile Pipfile.lock ./

RUN pip install --upgrade pip && pip install pipenv && pipenv install --deploy --ignore-pipfile --system
COPY . .

FROM python:3.13-slim AS main

WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends libffi8 && rm -rf /var/lib/apt/lists/*

COPY --from=build /usr/local/lib/python3.13/site-packages /usr/local/lib/python3.13/site-packages
COPY --from=build /app /app