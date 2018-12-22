#!/bin/bash
dir=$(pwd)/
con=$(docker container ls -a -f name=www.task-book -q)
[[ !  -z  $con  ]] && docker start -ia www.task-book && exit 0

docker build --rm -f "Dockerfile" -t www.task-book:latest .

docker run -it -p 80:80 -v $dir:/var/www/html/ --name www.task-book www.task-book:latest