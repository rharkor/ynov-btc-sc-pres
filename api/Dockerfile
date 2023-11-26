FROM node:18-alpine as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ENV NODE_ENV production

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

RUN npm run build -w api

FROM node:18-alpine as backend

COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app/api

EXPOSE 3000
EXPOSE 3001

CMD [ "node", "dist/src/index.js" ]