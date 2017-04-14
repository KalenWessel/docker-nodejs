FROM node:latest

RUN mkdir -p /usr/local/webapp
WORKDIR /usr/local/webapp

COPY /webapp /usr/local/webapp/
RUN npm install

EXPOSE 80
CMD [ "npm", "start" ]

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost:8080/ || exit 1
