FROM node AS client-builder
WORKDIR /room-book
COPY ./package.json ./
RUN npm i
COPY . .
RUN ["npm","run","build"]

FROM nginx
COPY --from=client-builder room-book/dist/myAirbnb /usr/share/nginx/html
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
