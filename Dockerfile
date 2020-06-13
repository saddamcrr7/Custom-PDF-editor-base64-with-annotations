FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
RUN yarn build
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]