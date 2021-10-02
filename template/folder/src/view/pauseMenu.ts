import * as PIXI from 'pixi.js'
import { subscribeKey } from 'valtio/utils'

import * as pixi from '~/pixi'
import state from '~/state'

const createPauseMenu = ({
  width,
  height,
}: {
  width: number
  height: number
}): PIXI.Container => {
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

  subscribeKey(state.application, 'paused', render)

  return container
}

export default createPauseMenu
