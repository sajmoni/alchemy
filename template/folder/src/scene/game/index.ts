import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import * as particles from 'pixi-particles'
import { subscribe } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import state from '/state'
import { Render } from '/enum'
import { bar } from '/ui/fragment'
import { pauseMenu } from '/ui/view'
import { explosion } from '/particles'
import { SceneArgs } from '/type'
import { expand } from '/effect'

const game = ({ container }: SceneArgs): void => {
  const sprite = new PIXI.Sprite(ex.getTexture('square-1'))
  sprite.x = 10
  sprite.y = Render.GAME_HEIGHT / 2
  sprite.anchor.set(0.5)
  container.addChild(sprite)

  l1.forever(() => {
    state.square.x += 0.25
    state.square.angle += 2
    state.bar = Math.max(0, state.bar - 0.2)
  })

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

  const explosionParticles = new particles.Emitter(
    particleContainer,
    ['square-1'].map((fileName) => ex.getTexture(fileName)),
    explosion(),
  )

  explosionParticles.playOnceAndDestroy()

  const _pauseMenu = pauseMenu({
    width: Render.GAME_WIDTH,
    height: Render.GAME_HEIGHT,
  })

  container.addChild(_pauseMenu)
}

export default game
