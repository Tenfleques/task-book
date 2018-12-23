#!/bin/bash
dir=$(pwd)/
con=$(docker container ls -a -f name=mtb -q)
[[ !  -z  $con  ]] && docker start -ia mtb && exit 0

docker build --rm -f "Dockerfile" -t mtb:latest .

docker run -it -p 3306:3306 --name mtb mtb:latest