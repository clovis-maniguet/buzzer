FROM node:10-alpine

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY . /usr/src/app
RUN yarn

EXPOSE 8090

CMD ["node", "./index.js"]
