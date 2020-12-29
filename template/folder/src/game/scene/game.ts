import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import * as particles from 'pixi-particles'
import * as prism from 'state-prism'

import state from '../../state'
import { Render } from '../../constant'
import { bar, pauseMenu } from '../../component'
import { explosion } from '../../particles'
import { SceneArgs } from '../../type/scene'
import { expand } from '../../effect'

const game = ({ container }: SceneArgs) => {
  const sprite = new PIXI.Sprite(ex.getTexture('square1'))
  sprite.x = 10
  sprite.y = Render.GAME_HEIGHT / 2
  sprite.anchor.set(0.5)
  container.addChild(sprite)

  l1.forever(() => {
    state.square.x += 0.25
    state.square.angle += 2
    state.bar = Math.max(0, state.bar - 0.2)
  })

  l1.forever(() => {
    void expand(sprite)
  }, 180)

  prism.subscribe('square.x', (x) => {
    sprite.x = x
  })

  prism.subscribe('square.angle', (angle) => {
    sprite.angle = angle
  })

  const [manaBar, renderManaBar] = bar({
    initialValue: 1,
  })
  manaBar.position.set(50, 10)
  container.addChild(manaBar)

  prism.subscribe('bar', (bar) => {
    // value / max
    renderManaBar(bar / 100)
  })

  const particleContainer = new PIXI.Container()
  particleContainer.position.set(200, 50)
  container.addChild(particleContainer)

  const explosionParticles = new particles.Emitter(
    particleContainer,
    ['square1', 'square2'].map((fileName) => ex.getTexture(fileName)),
    explosion(),
  )

  explosionParticles.playOnceAndDestroy()

  const [_pauseMenu, renderPauseMenu] = pauseMenu({
    width: Render.GAME_WIDTH,
    height: Render.GAME_HEIGHT,
  })
  prism.subscribe('application.paused', (paused) => {
    renderPauseMenu(paused)
  })
  container.addChild(_pauseMenu)
}

export default game
