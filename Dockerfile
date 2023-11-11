FROM node:21-alpine

WORKDIR /react-app

RUN npm install -g npm@latest

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]