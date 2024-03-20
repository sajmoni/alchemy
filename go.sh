#!/bin/bash

set -e

rm -rf game
cd package/runtime
npm run build
cd ../../package/create
npm run build
chmod +x ./dist/package/create/src/index.js
cd ../..
node package/create/dist/package/create/src/index.js create game
cpy vite.dev.config.ts game --rename=vite.config.ts 
cd game 
npm run dev
