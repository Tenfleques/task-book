#!/bin/bash
docker build --rm -f "Dockerfile" -t www.task-book:latest .
cd database
docker build --rm -f "Dockerfile" -t mtb:latest .
docker-compose up