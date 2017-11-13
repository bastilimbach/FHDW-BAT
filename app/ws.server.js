const WebSocket = require('ws')

function createServer() {
  const wsServer = new WebSocket.Server({ port: 8080 })
  wsServer.on('connection', (ws) => {
    wsServer.client = ws
  })
  wsServer.sendMsg = function sendMsg(msg) {
    wsServer.client.send(msg)
  }
  return wsServer
}

module.exports = { createServer }
