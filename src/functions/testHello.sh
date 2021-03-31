APISERVER=https://172.16.40.130:8001
TOKEN=$(kubectl describe secret $(kubectl get secrets | grep default | cut -f1 -d ' ') | grep -E '^token' | cut -f2 -d':' | tr -d '\t')
# curl -L --data '{"Another": "Echo"}' --header "Authorization: Bearer $TOKEN"    --header "Content-Type:application/json"   $APISERVER/api/v1/proxy/namespaces/greencompute/services/hellojb:http-function-port --insecure
curl -L --data '{"Another": "Echo"}' --header "Authorization: Bearer $TOKEN"    --header "Content-Type:application/json"   $APISERVER/api/v1/proxy/namespaces/greencompute/services/hellojb --insecure
