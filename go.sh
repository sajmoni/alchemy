#!/bin/bash

set -e

rm -rf game
cd package/runtime
npm run build
cd ../../package/cli
npm run build
chmod +x ./dist/package/cli/src/index.js
cd ../..
node package/cli/dist/package/cli/src/index.js create game
cpy vite.dev.config.ts game --rename=vite.config.ts 
cd game 
npm run dev