import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import * as particles from 'pixi-particles'

import state from '../../state'
import { Render } from '../../constant'
import { bar, pauseMenu } from '../../ui'
import { explosion } from '../../particles'
import { RenderScene, SceneArgs } from '../../type/scene'
import { expand } from '../../effect'

const game = ({ container }: SceneArgs): RenderScene | void => {
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

  const [manaBar, renderManaBar] = bar({
    initialValue: 1,
  })
  manaBar.position.set(50, 10)
  container.addChild(manaBar)

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
  
  container.addChild(_pauseMenu)

  return {
    'application.paused': renderPauseMenu,
    'bar': (bar: number) => {
      // value / max
      renderManaBar(bar / 100)
    },
    'square.x': (x: number) => {
      sprite.x = x
    },
    'square.angle': (angle: number) => {
      sprite.angle = angle
    }
  }
}

export default game
