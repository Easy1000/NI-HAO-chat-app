FROM node:22-slim

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "run", "start" ]
