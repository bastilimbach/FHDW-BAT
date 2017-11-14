const WebSocket = require('ws')
const https = require('https')
const fs = require('fs')
const config = require('./config')

function createServer() {
  var wsServer
  if (process.env.NODE_ENV === 'production') {
    const serverOptions = {
      key: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/privkey.pem`),
      cert: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/cert.pem`),
      ca: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/chain.pem`),
    }
    var websockethttpsserver=https.createServer(serverOptions)
    websockethttpsserver.listen("8080")
    wsServer = new WebSocket.Server({server: websockethttpsserver})
  } else {
    wsServer = new WebSocket.Server({port:8080})
  }
  
  wsServer.on('connection', (ws) => {
    wsServer.client = ws
  })
  wsServer.sendMsg = function sendMsg(msg) {
    if (wsServer.client !== undefined && wsServer.client.readyState === WebSocket.OPEN) wsServer.client.send(msg)
  }
  return wsServer
}

module.exports = { createServer }
