#!/bin/bash 

# Get the list of databases 
customerdb=$(db2 list db directory | grep Indirect -B 5 |grep "Database alias" |awk ***REMOVED***'print $4'***REMOVED*** |grep "CUSTDB")
echo $customerdb
if [ -z "$customerdb" ] ; then 
   echo "DB: CUSTDB not found so let create it"
   db2 create database CUSTDB
   db2 -tvf create-tables.db2 -z mydb.log
fi
db2 "connect to CUSTDB"
db2 -x "select id,name from customers" |wc -l >> xx
read rows < xx 
echo $rows
rm xx
if [[ $rows -eq 0 ]]; then
 echo "There is no data in customer DB, let add some..."
 db2 -tvf loaddata.db2 -z mydb.log
else 
  if [[ $rows -lt 5 ]];then
    echo "You do not have all the records"
  else 
    echo "Good your db is up and populated"
  fi
fi

