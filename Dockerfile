FROM node:12.19-alpine
RUN apk update && apk add git
RUN npm install -g @gofynd/fdk-cli
RUN mkdir /srv/theme
WORKDIR /srv/theme
RUN mkdir .fdk
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY . .
ENTRYPOINT ["sh"]
