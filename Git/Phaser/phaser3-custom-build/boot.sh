#!/bin/bash

# step 1: build
echo "================ STEP 1 ==================="
echo 

npm run build

echo "========================================"
if [ $? -eq 0 ];then
	echo "OK"
else
	echo "FAIL"
fi
echo

# step 2: fix bug
echo "================ STEP 2 ==================="
echo 

gsed -i 's/src="data:/src=""+"data:/g' dist/phaser.min.js

echo "========================================"
if [ $? -eq 0 ];then
	echo "OK"
else
	echo "FAIL"
fi
echo
