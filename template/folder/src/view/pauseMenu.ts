import { Container, utils } from 'pixi.js'
import * as ex from 'pixi-ex'
import { subscribeKey } from 'valtio/utils'

import state from '~/state'

const createPauseMenu = ({
  width,
  height,
}: {
  width: number
  height: number
}): Container => {
  const container = new Container()
  container.zIndex = 1
  container.visible = false

  const overlay = ex.graphics(container)
  overlay
    .beginFill(utils.string2hex('#000000'), 0.5)
    .drawRect(0, 0, width, height)
    .endFill()

  const text = ex.text(
    container,
    {
      fill: 'white',
      fontSize: 8,
    },
    'Paused (Click anywhere to resume)',
  )
  text.anchor.set(0.5)
  text.x = width / 2
  text.y = height / 2

  const render = (paused: boolean): void => {
    container.visible = paused
  }

  subscribeKey(state.application, 'paused', render)

  return container
}

export default createPauseMenu
