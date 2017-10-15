class WebsocketController {
  constructor(ws) {
    this.ws = ws
    this.ws.on('close', () => {
      console.log('WebSocket connection closed.')
    })

    this.ws.on('locationUpdate', (location) => {
      console.log(JSON.stringify(location))
    })
  }
}

module.exports = WebsocketController
