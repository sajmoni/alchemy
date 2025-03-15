import { Application } from 'pixi.js'
import createGame from 'alchemy-engine'

import { keys, scenes } from './data.js'
import { state } from './state.js'

import sounds from './sounds.json' with { type: 'json' }

const app = new Application()

const gameWidth = 640
const gameHeight = 480

async function main() {
  await app.init({
    width: gameWidth,
    height: gameHeight,
    resolution: 2,
    antialias: true,
    backgroundColor: 0x333333,
  })

  const spriteSheetPath = './asset/spritesheet/data.json'
  const font = '10pt "Press Start 2P"'

  createGame({
    app,
    state,
    scene: 'game',
    scenes,
    keys,
    sounds,
    spriteSheetPath,
    font,
    config: {
      pixelPerfect: true,
      fullScreen: true,
    },
    panel: [],
  })
}

main()
