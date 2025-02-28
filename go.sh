#!/bin/bash

set -e

rm -rf game
npm run build
chmod +x ./dist/src/cli/index.js
mkdir game
cd game
# Prevent creating commit in root folder
git init
MODE=development node ../dist/src/cli/index.js create 
npm run dev
