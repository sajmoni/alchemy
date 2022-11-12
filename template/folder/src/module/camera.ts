import { Container } from 'pixi.js'
import { subscribe } from 'valtio'

import { Render } from '~/enum/app'
import state from '~/state'

const camera = (container: Container) => {
  const updateCamera = () => {
    const mockPlayerHeight = 8

    container.position.set(
      Render.GAME_WIDTH / 2 - state.player.x,
      Render.GAME_HEIGHT / 2 - state.player.y - mockPlayerHeight / 2,
    )
  }

  updateCamera()

  subscribe(state.player, () => {
    updateCamera()
  })
}

export default camera
