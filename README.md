# Betta Fish Keepers Community

> Betta-fish-keepers application, which is a community website. Due to COVID-19, people tend to be home with their pets. There is a growing population for fish keepers. Especially Betta fishes have identical behaviors, their keepers need to search for information about that species. This app is to help of Betta keepers.

## Version Info

- NodeJS v12.16.3

## Getting Started

#### To connect development, test server endpoint

Rename "config.config" directory to "config" and update the values/settings to your own

#### To connect production server endpoint + To set custom secret values

Rename "prisma/docker-compose.yml.yml" to "prisma/docker-compose.yml" and update the values/settings to your own

> Install Dependencies

```
$ npm install
```

> Create server

Compose data-model on docker, and deploy

```
$ cd prisma
$ sudo docker-compose up -d
$ prisma deploy -e ../config/dev.env
$ prisma deploy -e ../config/test.env
$ cd ..
```

> Get schema

```
$ npm run get-schema
```

> Test your app

To check downloaded app runs properly, you can run the test.
(If your filesystem is too slow, you can test each method in each time)

```
$ npm run test
```

> Run application

```
# For production mode
$ npm run start

# For development mode
$ npm run dev
```

## ✨Live Demo

The full website is live at [Netlify](betta-fish-community.netlify.app/)

The Backend is running at https://betta-fish-app-server-e68429f6645d.herokuapp.com/, can see API structure [GraphQL playground](https://betta-fish-app-server-e68429f6645d.herokuapp.com/graphql).
Watch graphql playground tutorial video [here](<https://suhypractice.s3.ap-northeast-2.amazonaws.com/shared/graphql-bettafish.mp4>).

Extensive documentation with examples [Postman doc](https://documenter.getpostman.com/view/8001436/T17CEALp)



- Version: 1.0.0
- Author: Suhyeon Jang
