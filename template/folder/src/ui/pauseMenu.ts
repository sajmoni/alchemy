import * as PIXI from 'pixi.js'

import * as pixi from '/pixi'
import { UIComponent } from '/type/ui'

const createPauseMenu = ({
  width,
  height,
}: {
  width: number
  height: number
}): UIComponent<boolean> => {
  const container = new PIXI.Container()
  container.zIndex = 1
  container.visible = false

  const overlay = new PIXI.Graphics()
  overlay
    .beginFill(PIXI.utils.string2hex('#000000'), 0.5)
    .drawRect(0, 0, width, height)
    .endFill()
  container.addChild(overlay)

  const text = pixi.text(
    'Paused (Click anywhere to resume)',
    new PIXI.TextStyle({
      fill: 'white',
      fontSize: 8,
    }),
  )
  text.x = width / 2
  text.y = height / 2
  container.addChild(text)

  const render = (paused: boolean): void => {
    container.visible = paused
  }

  return [container, render]
}

export default createPauseMenu
