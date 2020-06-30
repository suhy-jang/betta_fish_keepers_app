# Betta Fish Keepers API

> Backend API for Betta-fish-keepers application, which is a community website

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

Compose schema on docker, and deploy

```
$ cd prisma
$ sudo docker-compose up -d
$ prisma deploy -e ../config/dev.env
$ prisma deploy -e ../config/test.env
$ cd ..
```

> Get schema

get schema

```
$ npm run get-schema
```

> Test your app

To check downloaded app runs properly, you can run the test.

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

The API is live at [herokuapp](https://suhy-betta-keepers-api.herokuapp.com/)

Extensive documentation with examples [here](https://documenter.getpostman.com/view/8001436/T17CEALp)

- Version: 1.0.0
- Author: Suhyeon Jang
