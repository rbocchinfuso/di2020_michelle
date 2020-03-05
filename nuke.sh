#!/bin/bash
# Stop all containers
docker stop -f $(docker ps -a -q)
# Delete all containers
docker rm -f $(docker ps -a -q)
# Delete all images
docker rmi -f $(docker images -q)
# Delete image
docker rmi -f $container_name
