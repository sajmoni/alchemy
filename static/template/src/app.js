import * as PIXI from 'pixi.js'
import { GAME_HEIGHT, GAME_WIDTH } from './constant'

// TODO: Do not use PIXI.Application
const app = new PIXI.Application({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  // Can be enabled once a background image exists
  // clearBeforeRender: false,
  backgroundColor: 0x000077,
})

export default app
