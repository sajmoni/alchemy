import * as ex from 'pixi-ex'
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

const game = ({ container, textures }: SceneArgs): void => {
  const worldContainer = ex.container(container)
  const uiContainer = ex.container(container)
  camera(worldContainer)

  const sprite = ex.sprite(worldContainer, textures['square-1'])
  sprite.x = state.player.x
  sprite.y = state.player.y
  sprite.angle = state.player.angle
  sprite.anchor.set(0.5)

  l1.forever(() => {
    state.player.x += 0.25
    state.player.angle += 2
    state.bar = Math.max(0, state.bar - 0.2)
  }, 1)

  subscribe(state.player, () => {
    sprite.x = state.player.x
    sprite.y = state.player.y
    sprite.angle = state.player.angle
  })

  l1.forever(() => {
    void expand(sprite)
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

  container.addChild(_pauseMenu)
}

export default game
