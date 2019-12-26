FROM node AS builder
WORKDIR /myAirbnb
COPY ./package.json ./
RUN npm i
COPY . .
