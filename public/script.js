/* eslint-disable */
const markerCoordinates = { lat: 50.98382, lng: 7.1174013 }
let marker
let map
let directionsService
let destination = []
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: markerCoordinates,
    disableDefaultUI: true,
  })
  marker = new google.maps.Marker({
    position: markerCoordinates,
    map,
  })
  directionsService = new google.maps.DirectionsService()

}

function moveMarker(lat, lng) {
  marker.setPosition(new google.maps.LatLng(lat, lng))
  map.panTo(new google.maps.LatLng(lat, lng))
}

function displayMessage(msg) {
  const messageEl = document.getElementById('userMessage')
  messageEl.innerHTML = msg
}

function getDuration(origin, destination, callback) {
  directionsService.route({
    origin: new google.maps.LatLng(origin[0], origin[1]),
    destination: new google.maps.LatLng(destination[0], destination[1]),
    travelMode: 'DRIVING',
  }, (response, status) => {
    if (status === 'OK') {
      callback(response.routes[0].legs[0].duration.text)
    } else {
      callback('Error')
    }
  })
}

const ws = new WebSocket('wss://gcp.sebastianlimbach.com/')
// const ws = new WebSocket('ws://localhost:3000/')
ws.onmessage = function (event) {
  const wsData = JSON.parse(event.data)
  switch (wsData.type) {
    case 'location':
      const locationLat = wsData.location.latitude
      const locationLng = wsData.location.longitude
      moveMarker(locationLat, locationLng)
      if (destination.length === 2) {
        getDuration([locationLat, locationLng], destination, (time) => {
          document.getElementById('time').innerHTML = time
        })
      } else {
        document.getElementById('time').innerHTML = 'Hat kein Ziel'
      }
      break
    case 'destination':
      console.log(wsData.destination)
      if (Object.keys(wsData.destination).length === 0) {
        destination = []
      } else {
        destination = [wsData.destination[0].latitude, wsData.destination[0].longitude]
      }
      break
    case 'message':
      displayMessage(wsData.message)
      break
    default:
      break
  }
}
ws.onopen = function (event) {
//   alert('Socket connected')
}