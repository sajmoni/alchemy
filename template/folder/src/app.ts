import * as PIXI from 'pixi.js'
import { Render } from '~/enum'

// * Enable to turn on pixel perfect rendering:
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
PIXI.settings.ROUND_PIXELS = true
PIXI.settings.RESOLUTION = 2

const renderer = new PIXI.Renderer({
  width: Render.GAME_WIDTH,
  height: Render.GAME_HEIGHT,
  // * Enable to turn on pixel perfect rendering:
  // antialias: false,
  backgroundColor: 0x000077,
})

const stage = new PIXI.Container()

// * Disable this if you don't need z-index position on children
stage.sortableChildren = true

const loader = new PIXI.Loader()

const app = {
  renderer,
  stage,
  loader,
}

export default app
