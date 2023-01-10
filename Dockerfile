FROM node:16-alpine

RUN apk --update-cache add sqlite && rm -rf /var/cache/apk/*

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run build

ENTRYPOINT ["node", "build/index.js"]

