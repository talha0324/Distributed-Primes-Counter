#!/bin/bash
testReportDirectory="./testReport"
tag="0"
name="worker"
#CHECK IF TAG PROVIDED
if [ ! -z "$1" ]; then
tag=$1
fi
#CHECK IF REPORT DIRECOTRY IS PROVIDED
if [ ! -z "$2" ]; then
testReportDirectory=$2
fi
#CHECK IF CONTAINER NAME IS PROVIDED
if [ ! -z "$3" ]; then
name=$3
fi
#REMOVE DIRECTORY IF EXISTS
if [ -d "$testReportDirectory" ]; then
rm -r $testReportDirectory
fi
label="label="$name"_"$tag"=true"
id=`docker images --filter $label -q`
docker run -t -d --name $name"_"$tag $id
docker cp $name"_"$tag:/buildapp/unit_test_results $testReportDirectory
docker rm -f $name"_"$tag
docker rmi $id