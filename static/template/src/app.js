import * as PIXI from 'pixi.js'
import { GAME_HEIGHT, GAME_WIDTH } from './constant'

// * Enable to turn on pixel perfect rendering:
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
// PIXI.settings.ROUND_PIXELS = true

const renderer = new PIXI.Renderer({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  // * Enable to turn on pixel perfect rendering:
  // antialias: false,
  // * Can be enabled once a background image exists
  // * This might increase performance
  // clearBeforeRender: false,
  // preserveDrawingBuffer: true,
  // 
  backgroundColor: 0x000077,
})

const stage = new PIXI.Container()

const ticker = new PIXI.Ticker()
ticker.add(() => {
  renderer.render(stage)
}, PIXI.UPDATE_PRIORITY.LOW)

// * Enables setting z-index on children
// stage.sortableChildren = true

const loader = new PIXI.Loader()

export default {
  renderer, stage, ticker, loader,
}
