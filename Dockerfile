# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . .
CMD ["node", "app.js"]
EXPOSE 3000