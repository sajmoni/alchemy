#!/bin/bash

set -e

rm -rf game
npm run build
chmod +x ./dist/src/cli/index.js
MODE=development node dist/src/cli/index.js create game
cd game 
npm run dev
