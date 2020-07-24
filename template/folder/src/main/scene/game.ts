import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import * as particles from 'pixi-particles'

import state from '../../state'
import { Render } from '../../constant'
import { bar, pauseMenu } from '../../component'
import { explosion } from '../../particles'
import { SceneArgs } from '/type/scene'
import { expand } from '/effect'

const game = ({ container, subscribe }: SceneArgs) => {
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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expand(sprite)
  }, 180)

  subscribe('square.x', (x) => {
    sprite.x = x
  })

  subscribe('square.angle', (angle) => {
    sprite.angle = angle
  })

  const [manaBar, renderManaBar] = bar({
    initialValue: 1,
  })
  manaBar.position.set(200, 200)
  container.addChild(manaBar)

  subscribe('bar', (bar) => {
    // value / max
    renderManaBar(bar / 100)
  })

  const particleContainer = new PIXI.Container()
  particleContainer.position.set(400, 200)
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
  subscribe('application.paused', (paused) => {
    renderPauseMenu(paused)
  })
  container.addChild(_pauseMenu)
}

export default game
