FROM node:18-alpine as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ENV NODE_ENV production

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

RUN npm run build -w app

FROM node:18-alpine as backend

COPY --from=build /usr/src/app /usr/src/app

WORKDIR /usr/src/app/app

EXPOSE 4173

CMD [ "npm", "run", "preview", "--", "--host" ]