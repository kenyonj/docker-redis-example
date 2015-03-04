FROM node:0.10.34

RUN ["mkdir", "-p", "/app"]
ADD . /app
WORKDIR /app
RUN ["npm", "install"]

EXPOSE 80
