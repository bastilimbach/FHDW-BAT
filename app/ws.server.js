const WebSocket = require('ws')
const WebSocketController = require('./controllers/ws.controller')

let wsServer
function createServer(server) {
  wsServer = new WebSocket.Server({ server })
  wsServer.on('connection', (ws) => {
    console.log('New WebSocket connection opened.')
    new WebSocketController(ws)
  })
  return wsServer
}

module.exports = { createServer, wsServer }
