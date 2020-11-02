#!/bin/bash
#Author: k.durimel@gmail.com
#Arg 1 : directory uuid
#Arg 2 : list of files to zip

#
### En prod : add -q option 
#

# init and create currentir : zip directory (tmp/uuid/)
sleep 6 #async file creation support quickfix
#currentDir=/mnt/20To-vol/tmp/$1 #arg $1 = uuid
#currentDir=/global/scratch/tmp/$1
currentDir=tmp/$1
mkdir -p $currentDir 

# parse list of files to zip 
filesList=$2 #$2 = file path : tmp/uuid/filename

# Zip files (listed in fileslist) with the lowest compression ratio (0).

#currentDate=$(date +"%Y%m%d_%Hh%Mm%Ss")
zipName="wgsdata_"$1
zip -0 -j $currentDir/$zipName -@ < $filesList

#Then, zip file is availaible until they are deleted (weekly)
