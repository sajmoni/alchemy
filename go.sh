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
node package/create/dist/src/index.js create game
cp vite.dev.config.ts game
mv -f game/vite.dev.config.ts game/vite.config.ts
cd game 
npm run dev
