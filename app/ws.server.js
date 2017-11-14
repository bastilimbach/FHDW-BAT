const WebSocket = require('ws')
const eventBus = require('./eventBus')

function createServer(server) {
  const wsServer = new WebSocket.Server({ server })
  wsServer.on('connection', (ws) => {
    eventBus.on('locationUpdate', (location) => {
      ws.send(JSON.stringify({ type: 'location', location }))
    })
    eventBus.on('messageUpdate', (message) => {
      ws.send(JSON.stringify({ type: 'message', message }))
    })
  })
}

module.exports = { createServer }
