echo "Verify customer"
db2 "connect to CUSTDB"
db2 -x "select id,name from customers" 

echo "Verify accounts"
db2 -x "select accountNumber from accounts" 
