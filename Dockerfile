FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 8080
CMD [ "node", "server.js" ]