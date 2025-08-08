FROM node:alpine AS build

COPY . /frontend
WORKDIR /frontend

RUN npm i && npm run build

FROM nginx:alpine AS main

# copies static files and nginx configuration
COPY --from=build /frontend/dist /static
COPY nginx.conf /etc/nginx/nginx.conf