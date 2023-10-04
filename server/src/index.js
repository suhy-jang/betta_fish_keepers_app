import '@babel/polyfill/noConflict'
import { createSchema, createYoga } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
const path = require('path')
const express = require('express')
import getUserId from './utils/getUserId'
import typeDefs from './typedefs'
import { resolvers } from './resolvers'

const app = express()

const prisma = new PrismaClient()

const origin =
  process.env.NODE_ENV === 'production' ? process.env.ORIGIN : 'localhost'

const opts = {
  endpoint: '/graphql',
  port: process.env.PORT || 4000,
  tracing: true,
  playground: '/graphql/playground',
  cors: {
    origin,
  },
}

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static('public'))
  app.get('*', (req, res, next) => {
    const routes = ['/graphql', '/graphql/playground']

    if (routes.includes(req.url)) {
      return next()
    }

    res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
  })
}

const yoga = createYoga({
  schema: createSchema({
    typeDefs,
    resolvers,
    context({ request }) {
      return {
        prisma,
        request,
        getUserId,
      }
    },
  }),
})

app.use(yoga.graphqlEndpoint, yoga)

app.listen(opts, () => {
  console.log('The server is up')
})

process
  .on('unhandledRejection', (reason, promise) => {
    console.warn('Unhandled Rejection at: ', promise, 'reason: ', reason)
  })
  .on('uncaughtException', (err) => {
    console.warn(err, 'Uncaught Exception thrown')
    process.exit(1)
  })
