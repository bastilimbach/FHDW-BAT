#!/usr/bin/env node
const config = require('./config')
const http = require('http')
const appServer = require('./app.server')
const wsServer = require('./ws.server')
const mongoose = require('mongoose')

const server = http.createServer(appServer)
wsServer.createServer(server)

console.log(server)

mongoose.Promise = global.Promise
mongoose.connect(config.db.url, config.db.mongoDBConfig).then(() => {
  console.log('Mongo DB connection established!') // eslint-disable-line no-console
}).catch((err) => {
  console.error(`Mongo DB connection failure: ${err.stack}`) // eslint-disable-line no-console
})

server.listen(config.server.port, () => {
  console.log(`API running on port ${config.server.port}!`) // eslint-disable-line no-console
})
