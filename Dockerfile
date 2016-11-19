FROM node:alpine
MAINTAINER Cuong Ba

RUN node -v
RUN npm -v
RUN npm install -g pm2

WORKDIR /build
COPY ./ /build/

RUN npm install

EXPOSE 5000