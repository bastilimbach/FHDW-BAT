/* eslint-disable */
const markerCoordinates = { lat: 50.98382, lng: 7.1174013 }
let marker
let map
let directionsService
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

const ws = new WebSocket('ws://localhost:3000')
ws.onmessage = function (event) {
  const wsData = JSON.parse(event.data)
  switch (wsData.type) {
    case 'location':
      const lat = wsData.location.latitude
      const lng = wsData.location.latitude
      moveMarker(lat, lng)
      if (wsData.destination !== 'null' && typeof wsData.destination !== 'undefined') {
        getDuration([lat, lng], [wsData.destination.latitude, wsData.destination.longitude], (time) => {
          document.getElementById('time').innerHTML = time
        })
      } else {
        document.getElementById('time').innerHTML = 'Hat kein Ziel'
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