#!/bin/bash

/usr/bin/sed -i '' '/^var assets =/d' src/main.js
echo -n "var assets = " >> src/main.js
cat ./src/assets.json >> src/main.js
