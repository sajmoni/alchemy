import { Application } from 'pixi.js'
import createGame from 'alchemy-engine'

import { keys, scenes } from './data.js'
import { state } from './state.js'

import sounds from './sounds.json' with { type: 'json' }

const app = new Application()

const GAME_WIDTH = 640
const GAME_HEIGHT = 480

function getResolution() {
  const WINDOW_WIDTH = window.innerWidth
  const WINDOW_HEIGHT = window.innerHeight

  const resolution = Math.min(
    WINDOW_WIDTH / GAME_WIDTH,
    WINDOW_HEIGHT / GAME_HEIGHT,
  )

  return resolution
}

window.addEventListener('resize', () => {
  app.renderer.resolution = getResolution()
})

async function main() {
  await app.init({
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    resolution: getResolution(),
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
    },
    panel: [],
  })
}

main()
