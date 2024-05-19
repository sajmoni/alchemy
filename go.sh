#!/bin/bash

set -e

rm -rf game
cd package/runtime
npm run build
cd ../../package/cli
npm run build
cd ../../package/create
npm run build
chmod +x ./dist/src/index.js
cd ../..
MODE=development node package/create/dist/src/index.js create game
cd game 
npm run dev
