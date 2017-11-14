var markerCoordinates = {lat: 50.98382, lng: 7.1174013};
var marker;
var map;
var directionsService;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: markerCoordinates,
		disableDefaultUI: true
	});
	marker = new google.maps.Marker({
		position: markerCoordinates,
		map: map
	});
	directionsService = new google.maps.DirectionsService;
	
}

function moveMarker(lat, lng){
	marker.setPosition( new google.maps.LatLng( lat, lng ) );
	map.panTo( new google.maps.LatLng( lat, lng ) );
}

function displayMessage(msg) {
	var messageEl = document.getElementById("userMessage");
	messageEl.innerHTML = msg;
}

function getDuration(origin, destination, callback) {
	directionsService.route({
		origin: new google.maps.LatLng( origin[0], origin[1] ),
		destination: new google.maps.LatLng( destination[0], destination[1] ),
		travelMode: 'DRIVING'
	}, function(response, status) {
		if (status === 'OK') {
			callback(response.routes[0].legs[0].duration.text);
		} else {
			callback("Error");
		}
	});
}

var ws = new WebSocket('ws://localhost:8080')
ws.onmessage = function (event) {
	console.log(event.data)
	if(event.data.header === "Message") {
		displayMessage(event.data);
	} else if(event.data.header === "Location") {
		var lat = event.data.latitude;
		var lng = event.data.longitude;
		moveMarker(lat, lng);
		if(event.data.destination !== "null"){
			getDuration([lat,lng], [event.data.destination.lat,event.data.destination.lng], function(time) {
				document.getElementById("time").innerHTML = time;
			});
		} else {
			document.getElementById("time").innerHTML = "Hat kein Ziel";
		}
	} 
}
ws.onopen = function (event) {
	alert("Socket connected");
}
  
//https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyA830pjkq_FQY1MkDCpShsfxLTy3ALZBQA
