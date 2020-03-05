#!/bin/bash

# initialize the db
./dbsetup.py -D
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start my_first_process: $status"
  exit $status
fi

# start the second process
./app.py -D
status=$?
if [ $status -ne 0 ]; then
  echo "Failed to start my_second_process: $status"
  exit $status
fi

# loop every 60 seconds and check for running app.py process, exit container on error
while sleep 60; do
  ps aux |grep app.py |grep -q -v grep
  APP_STATUS=$?
  # if the greps above find anything, they exit with 0 status
  # if they are not both 0, then something is wrong
  if [ $APP_STATUS -ne 0 ]; then
    echo "app.py process is running."
    exit 1
  fi
done