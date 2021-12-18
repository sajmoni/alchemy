import * as ex from 'pixi-ex'
import { Container } from 'pixi.js'

import { Render, TextStyle } from '~/enum'

const createFullscreenLoading = (): Container => {
  const loadingContainer = new Container()
  loadingContainer.zIndex = 9999

  const loadingBackground = ex.graphics(loadingContainer)
  loadingBackground
    .beginFill(0x00_00_00)
    .drawRect(0, 0, Render.GAME_WIDTH, Render.GAME_HEIGHT)

  const loading = ex.text(loadingContainer, TextStyle.MAIN, 'Loading')
  ex.centerX(loading, Render.GAME_WIDTH / 2)
  ex.centerY(loading, Render.GAME_HEIGHT / 2)
  loadingContainer.addChild(loading)

  return loadingContainer
}

export default createFullscreenLoading
