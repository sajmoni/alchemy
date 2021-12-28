import * as ex from 'pixi-ex'
import { Container } from 'pixi.js'

import { Render, TextStyle } from '~/enum'

const createFullscreenLoading = (): Container => {
  const loadingContainer = new Container()
  loadingContainer.visible = false
  loadingContainer.zIndex = 9999

  const loadingBackground = ex.graphics(loadingContainer)
  loadingBackground
    .beginFill(0x00_00_00)
    .drawRect(0, 0, Render.GAME_WIDTH, Render.GAME_HEIGHT)

  const loading = ex.text(loadingContainer, TextStyle.MAIN, 'Loading...')
  loading.position.set(Render.GAME_WIDTH / 2, Render.GAME_HEIGHT / 2)
  loading.anchor.set(0.5)
  loadingContainer.addChild(loading)

  return loadingContainer
}

export default createFullscreenLoading
