import { container, sprite } from 'pixi-ex'
import * as l1 from 'l1'
import { subscribe } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import state from '~/state'
import { Render } from '~/enum/app'
import bar from '~/fragment/ui/bar'
import pauseMenu from '~/view/pauseMenu'
import { SceneArgs } from '~/type/app'
import expand from '~/effect/expand'
import camera from '~/module/camera'

const game = ({ container: _container, textures }: SceneArgs): void => {
  const worldContainer = container(_container)
  const uiContainer = container(_container)
  camera(worldContainer)

  const square = sprite(worldContainer, textures['square-1'])
  square.x = state.player.x
  square.y = state.player.y
  square.angle = state.player.angle
  square.anchor.set(0.5)

  l1.forever(() => {
    state.player.x += 0.25
    state.player.angle += 2
    state.bar = Math.max(0, state.bar - 0.2)
  }, 1)

  subscribe(state.player, () => {
    square.x = state.player.x
    square.y = state.player.y
    square.angle = state.player.angle
  })

  l1.forever(() => {
    void expand(square)
  }, 180)

  const [manaBar, renderManaBar] = bar({
    initialValue: 1,
  })
  subscribeKey(state, 'bar', (bar) => {
    renderManaBar(bar / 100)
  })
  manaBar.position.set(60, 5)
  uiContainer.addChild(manaBar)

  const _pauseMenu = pauseMenu({
    width: Render.GAME_WIDTH,
    height: Render.GAME_HEIGHT,
  })

  uiContainer.addChild(_pauseMenu)
}

export default game
