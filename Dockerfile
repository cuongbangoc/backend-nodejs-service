FROM node:alpine
MAINTAINER Cuong Ba

RUN node -v && npm -v
RUN npm install -g pm2

WORKDIR /build

ADD ./package.json /build
RUN npm install

ADD ./ /build

EXPOSE 5000