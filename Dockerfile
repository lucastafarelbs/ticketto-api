FROM node:16
WORKDIR /api
COPY package.json /api/package.json
RUN npm cache clean --force
RUN npm i
COPY . /api

EXPOSE 3550
