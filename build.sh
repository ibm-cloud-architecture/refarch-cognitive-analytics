#!/bin/bash
# Program to modify the version number for the different element and compile

# Get default version if the version is not the first argument
if [[ $# -gt 0 ]]; then
	v=v$1
else
	v="v0.0.1"
fi
echo $v

cd src
# TODO add a sed or awk to modify the version in the client considerations
sed -i -e 's/"v0.0.1"/$v/g' client/app/app.component.ts

# TODO modify version for server
sed -i -e 's/"v0.0.1"/$v/g' server/config/config.json
# Compile Angular
ng build
# Build docker
docker build -t ibmcase/greenapp .
docker tag ibmcase/greenapp greencluster.icp:8500/greencompute/greenapp:$v

docker images
## modify helm version
cd ../chart/green-customerapp
a=$(grep 'version' Chart.yaml)
sed -i -e 's/"$a"/version: "$v"/g' Chart.yaml
## same for the tag in values.yaml
