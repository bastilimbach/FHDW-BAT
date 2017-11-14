curl -X DELETE \
  http://localhost:3000/destination/ \
  -H 'authorization: Bearer sebastian' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 0ad0c0d0-81e5-1454-623a-9857bc0d7265'
  
curl -X POST \
  http://localhost:3000/destination/ \
  -H 'authorization: Bearer sebastian' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 5fbefeb9-29b5-93cb-31fa-d8cca90cc8c3' \
  -d '{
	"destinationID":0,
	"name":"FHDW Bergisch Gladbach",
	"latitude":50.983725,
	"longitude":7.118303
}'
curl -X POST \
  http://localhost:3000/destination/ \
  -H 'authorization: Bearer sebastian' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 5fbefeb9-29b5-93cb-31fa-d8cca90cc8c3' \
  -d '{
	"destinationID":1,
	"name":"FHDW Paderborn",
	"latitude":51.730811, 
	"longitude":8.736781
}'
curl -X POST \
  http://localhost:3000/destination/ \
  -H 'authorization: Bearer sebastian' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 5fbefeb9-29b5-93cb-31fa-d8cca90cc8c3' \
  -d '{
	"destinationID":2,
	"name":"FHDW Bielefeld",
	"latitude":52.013448,
	"longitude":8.569027
}'
curl -X POST \
  http://localhost:3000/destination/ \
  -H 'authorization: Bearer sebastian' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 5fbefeb9-29b5-93cb-31fa-d8cca90cc8c3' \
  -d '{
	"destinationID":3,
	"name":"FHDW Marburg",
	"latitude":51.730997,
	"longitude":8.736287
}'
curl -X POST \
  http://localhost:3000/destination/ \
  -H 'authorization: Bearer sebastian' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 5fbefeb9-29b5-93cb-31fa-d8cca90cc8c3' \
  -d '{
	"destinationID":4,
	"name":"FHDW Mettmann",
	"latitude":51.251601,
	"longitude":6.951413
}'