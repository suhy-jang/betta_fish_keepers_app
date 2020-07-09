import '@babel/polyfill/noConflict'
import server from './server'
import os from 'os'
const path = require('path')
const express = require('express')

const host =
  'http://' +
  (process.env.NODE_ENV === 'production' ? os.hostname() : 'localhost')
const port = process.env.PORT || 4000

const opts = {
  endpoint: '/graphql',
  port,
  tracing: true,
  playground: '/graphql/playground',
  cors: {
    origin: [`${host}:3000`],
  },
}

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  server.express.use('/', express.static('public'))
  server.express.get('*', (req, res, next) => {
    const routes = ['/graphql', '/subscriptions', '/graphql/playground']

    if (routes.includes(req.url)) {
      return next()
    }

    res.sendFile(path.resolve(__dirname, '../public', 'index.html'))
  })
}

server.start(opts, () => {
  console.log('The server is up')
})
