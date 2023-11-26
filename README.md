# React presentation

Create your presentation easily using ReactJS

## Features

- [x] Create your presentation using ReactJS
- [x] Share your presentation with your friends
- [x] Control the shown slide for all users
- [x] Phone remote control mode
- [x] Fullscreen mode

## How to use

### Install dependencies

```bash
npm install
```

### Setup the .env file

```bash
cp api/.env.example api/.env
cp app/.env.example app/.env
```

**Note: Don't forget to change the values in the api/.env file**

### Run the app

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

_Note: you can modify the presentation title in `app/index.html`_

## Customize your presentation

In order to customize your presentation, you need to edit the file `app/src/slides/index.ts` and add your slides in.
