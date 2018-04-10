#!/bin/bash
#Author: k.durimel@gmail.com
#Arg 1 : directory uuid
#Arg 2 : list of files to zip


# init and create currentir : zip directory (tmp/uuid/)
currentDir=tmp/$1 #arg $1 = uuid
mkdir -p $currentDir 

# parse list of files to zip 
filesList=$2 #$2 = file path : tmp/uuid/filename

# Zip files (listed in fileslist) with the lowest compression ratio (0)
zip -0 $currentDir/wgsdata -@ < $filesList

#Then, zip file is availaible until they are deleted (weekly)