import * as PIXI from 'pixi.js'
import { GAME_HEIGHT, GAME_WIDTH } from './constant'

// * Enable to turn on pixel perfect rendering
// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST

const renderer = new PIXI.Renderer({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  antialias: false,
  // * Can be enabled once a background image exists
  // clearBeforeRender: false,
  backgroundColor: 0x000077,
})

const stage = new PIXI.Container()

const ticker = new PIXI.Ticker()
ticker.add(() => {
  renderer.render(stage)
}, PIXI.UPDATE_PRIORITY.LOW)

stage.sortableChildren = true

const loader = new PIXI.Loader()

export default {
  renderer, stage, ticker, loader,
}
