# ninaivu

Frontend for ninaivu in next.js

## Required

- mongodb
- node > 16

## Getting started

```
$ git clone https://github.com/aktsbot/ninaivu-nextjs-frontend.git
$ cd ninaivu-nextjs-frontend
$ nvm use
$ npm i
$ cp .env.local.example .env.local
$ # fix values in env
$ EMAIL="valiemail@gmail.com" npm run dev:insert-user
```

To insert dummy patients

```
$ npm run dev:seed-patients
```
