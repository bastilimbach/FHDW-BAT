#!/usr/bin/env node
const config = require('./config')
const http = require('http')
const https = require('https')
const fs = require('fs')
const appServer = require('./app.server')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(config.db.url, config.db.mongoDBConfig).then(() => {
  console.log('Mongo DB connection established!') // eslint-disable-line no-console
}).catch((err) => {
  console.error(`Mongo DB connection failure: ${err.stack}`) // eslint-disable-line no-console
})

let server
if (process.env.NODE_ENV === 'production') {
  const serverOptions = {
    key: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/privkey.pem`),
    cert: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/cert.pem`),
    ca: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/chain.pem`),
  }
  server = https.createServer(serverOptions, appServer)
} else {
  server = http.createServer(appServer)
}

server.listen(config.server.port, () => {
  console.log(`API running on port ${config.server.port}!`) // eslint-disable-line no-console
})
