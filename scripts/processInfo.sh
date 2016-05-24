#!/bin/bash

# Argument 1: User
# Display only information about this user

# Argument 2: Statistic
# Display the following statistic about all processes
# 1 Process ID
# 2 CPU%
# 3 MEM%
# 4 Virtual Memory Usage
# 5 Real Memory Usage
# 6 Terminal associated with process
# 7 Process Status Code
# 8 Process Start Date
# 9 Process Time Alive
# 10 Process Name

#Ensure there is only 1 or 2 arguments
if [[ "$#" -eq 0 || "$#" -gt 2 ]]; then
	echo "Please enter only 1 - 2 arguments"
	exit
fi

user=''
statistic=''

#Get correct vars given 1 or 2 arguments
if [ "$#" -eq 2 ]; then
	user=$1
	statistic=$(($2 + 1))
else
	user=`whoami`
	statistic=$(($1 + 1))
fi

#display information
echo `ps u -u $user | grep -v 0:00 | awk -v i=$statistic '{print $i}'`
