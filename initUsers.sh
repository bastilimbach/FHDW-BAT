# DOMAIN="https://gcp.sebastianlimbach.com"
# TOKEN="sebastian"
 
curl -X POST \
  ${DOMAIN}/user/ \
  -H 'authorization: Bearer '${TOKEN} \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 5fbefeb9-29b5-93cb-31fa-d8cca90cc8c3' \
  -d '{
	"username":"test"
}'

curl -X POST \
  ${DOMAIN}/user/ \
  -H 'authorization: Bearer '${TOKEN} \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 5fbefeb9-29b5-93cb-31fa-d8cca90cc8c3' \
  -d '{
	"username":"BAL"
}'

curl -X POST \
  ${DOMAIN}/user/ \
  -H 'authorization: Bearer '${TOKEN} \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 5fbefeb9-29b5-93cb-31fa-d8cca90cc8c3' \
  -d '{
	"username":"TUP"
}'