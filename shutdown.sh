#!/bin/bash	
if [ -e ./frontend_pid.file ]; then	
    pid=$(cat ./frontend_pid.file)	
    kill $pid	
    rm ./frontend_pid.file	
    echo "Frontend stopped."	
else	
    echo "Frontend is not running or pid file not found."	
fi