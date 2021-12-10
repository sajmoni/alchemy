import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import * as particles from '@pixi/particle-emitter'
import { subscribe } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import state from '~/state'
import { Render } from '~/enum'
import { bar } from '~/fragment'
import { pauseMenu } from '~/view'
import { explosion } from '~/particles'
import { SceneArgs } from '~/type'
import { expand } from '~/effect'
import getTexture from '~/util/getTexture'

const game = ({ container }: SceneArgs): void => {
  const sprite = ex.sprite(container, getTexture('square-1.png'))
  sprite.x = 10
  sprite.y = Render.GAME_HEIGHT / 2
  sprite.anchor.set(0.5)

  l1.forever(() => {
    state.square.x += 0.25
    state.square.angle += 2
    state.bar = Math.max(0, state.bar - 0.2)
  }, 1)

  subscribe(state.square, () => {
    sprite.x = state.square.x
    sprite.angle = state.square.angle
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
  manaBar.position.set(50, 10)
  container.addChild(manaBar)

  const particleContainer = new PIXI.Container()
  particleContainer.position.set(200, 50)
  container.addChild(particleContainer)

  // eslint-disable-next-line no-new
  new particles.Emitter(particleContainer, explosion())

  const _pauseMenu = pauseMenu({
    width: Render.GAME_WIDTH,
    height: Render.GAME_HEIGHT,
  })

  container.addChild(_pauseMenu)
}

export default game
