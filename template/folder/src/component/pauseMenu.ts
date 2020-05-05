import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

type render = (paused: boolean) => void

const createPauseMenu = ({
  width,
  height,
}: {
  width: number
  height: number
}): [PIXI.Container, render] => {
  const container = new PIXI.Container()
  container.zIndex = 1
  container.visible = false

  const overlay = new PIXI.Graphics()
  overlay
    .beginFill(ex.fromHex('#000000'), 0.5)
    .drawRect(0, 0, width, height)
    .endFill()
  container.addChild(overlay)

  const text = new PIXI.Text('Paused', { fill: 'white' })
  ex.centerX(text, width / 2)
  ex.centerY(text, height / 2)
  container.addChild(text)

  const render = (paused) => {
    if (paused) {
      container.visible = true
    } else {
      container.visible = false
    }
  }

  return [container, render]
}

export default createPauseMenu
