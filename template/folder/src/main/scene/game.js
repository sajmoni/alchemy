import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import * as particles from 'pixi-particles'

import * as prism from '/util/prism'
import app from '../../app'
import state from '../../state'
import { Render } from '../../constant'
import { bar } from '../../component'
import { explosion } from '../../particle'

const game = () => {
  const container = new PIXI.Container()
  app.stage.addChild(container)

  const sprite = new PIXI.Sprite(ex.getTexture('square1'))
  sprite.x = 10
  sprite.y = Render.GAME_HEIGHT / 2
  sprite.anchor.set(0.5)
  container.addChild(sprite)

  l1.repeat(() => {
    state.square.x += 1
  }, 4)

  l1.repeat(() => {
    state.square.angle += 2
  })

  l1.repeat(() => {
    if (state.square.visible) {
      state.square.visible = false
    } else {
      state.square.visible = true
    }
  }, 30)

  prism.subscribe(['square.speed', 'square.angle', 'square.visible'], () => {
    const {
      square: { angle, x },
    } = prism.target(state)
    sprite.x = x
    sprite.angle = angle
  })

  const [manaBar, renderManaBar] = bar({
    initialValue: 1,
  })
  manaBar.position.set(200, 200)
  container.addChild(manaBar)
  const barBehavior = l1.repeat(() => {
    state.bar -= 1
    if (state.bar === 0) {
      l1.remove(barBehavior)
    }
  }, 10)
  prism.subscribe('bar', (bar) => {
    // value / max
    renderManaBar(bar / 100)
  })

  const particleContainer = new PIXI.Container()
  particleContainer.position.set(400, 200)
  container.addChild(particleContainer)

  const explosionParticles = new particles.Emitter(
    particleContainer,
    ['square1', 'square2'].map(ex.getTexture),
    explosion,
  )

  explosionParticles.playOnceAndDestroy()
}

export default game
