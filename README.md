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

This project requires that you use google oauth for logins and only
users mentioned in the `User` model are able to login. The `dev:insert-user`
npm script inserts a user into the `users` collection.

## Setting up oauth

- Head over to the [google cloud console](https://console.cloud.google.com).
- Create an account and then create a project.
- Look for "API & Services" and add a new entry in "OAuth 2.0 Client IDs".
- Setup "Authorized JavaScript origin"
- Setup "Authorized redirect URIs"
- Copy over the ClientID and ClientSecret to the `.env.local` file.

## Seeding

To insert dummy patients

```
$ npm run dev:seed-patients
```
