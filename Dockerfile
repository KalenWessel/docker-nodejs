FROM node:latest

RUN mkdir -p /usr/local/webapp
WORKDIR /usr/local/webapp

COPY /webapp /usr/local/webapp/
RUN npm install

EXPOSE 8080
CMD [ "npm", "start" ]

HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:8080/ || exit 1
