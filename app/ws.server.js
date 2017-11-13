const WebSocket = require('ws')

function createServer() {
  const wsServer = new WebSocket.Server({ port: 8080 })
  console.log('WebSocket opened on 8080')
  wsServer.on('connection', (ws) => {
    console.log(`New WebSocket connection opened from ${ws._socket.remoteAddress}`)
    wsServer.client = ws
  })
  wsServer.sendMsg = function sendMsg(msg) {
    if (wsServer.client !== undefined && wsServer.client.readyState === WebSocket.OPEN)wsServer.client.send(msg)
  }
  return wsServer
}

module.exports = { createServer }
