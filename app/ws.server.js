const WebSocket = require('ws')

function createServer() {
  const wsServer = new WebSocket.Server({
    key: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/privkey.pem`),
    cert: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/cert.pem`),
    ca: fs.readFileSync(`/certs/letsencrypt/live/${config.server.domain}/chain.pem`),
    port: 8080
  })
  wsServer.on('connection', (ws) => {
    wsServer.client = ws
  })
  wsServer.sendMsg = function sendMsg(msg) {
    if (wsServer.client !== undefined && wsServer.client.readyState === WebSocket.OPEN) wsServer.client.send(msg)
  }
  return wsServer
}

module.exports = { createServer }
