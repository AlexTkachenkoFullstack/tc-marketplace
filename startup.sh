#!/bin/bash	
nohup serve -s build > frontend_log.txt 2>&1 &	
echo $! > ./frontend_pid.file