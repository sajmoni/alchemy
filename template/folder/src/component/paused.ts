import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import { Render } from '../constant'

const WIDTH = 200
const HEIGHT = 100

type render = (paused: boolean) => void

const createPaused = (): [PIXI.Container, render] => {
  const container = new PIXI.Container()
  container.zIndex = 1
  container.visible = false

  const background = new PIXI.Graphics()
  background.beginFill(ex.fromHex('#000000')).drawRect(0, 0, WIDTH, HEIGHT)
  container.addChild(background)
  const text = new PIXI.Text('Paused', { fill: 'white ' })
  ex.centerX(text, WIDTH / 2)
  ex.centerY(text, HEIGHT / 2)

  container.addChild(text)

  const render = (paused) => {
    if (paused) {
      console.log('Paused')
      container.visible = true
    } else {
      container.visible = false
    }
  }

  ex.centerX(container, Render.GAME_WIDTH / 2)
  ex.centerY(container, Render.GAME_HEIGHT / 2)

  return [container, render]
}

export default createPaused
