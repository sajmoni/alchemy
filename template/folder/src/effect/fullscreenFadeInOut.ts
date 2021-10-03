import * as l1 from 'l1'
import * as PIXI from 'pixi.js'
import * as juice from 'juice.js'

import app from '~/app'
import { Render } from '~/enum'

const DURATION = 35

const ID = 'fullscreenFadeInOut'

const fullscreenFadeInOut = async (): Promise<void> =>
  new Promise((resolve) => {
    const fade = new PIXI.Graphics()
    fade.zIndex = 1
    app.stage.addChild(fade)

    const behavior = l1.every(
      fadeInOut(fade, DURATION, resolve as () => void),
      DURATION,
      {
        id: ID,
      },
    )
  })

type FadeInOutReturnType = (counter: number) => () => void

const fadeInOut = (
  graphics: PIXI.Graphics,
  duration: number,
  resolve: () => void,
): FadeInOutReturnType => {
  let hasResolved = false
  const animation = juice.parabola({
    duration,
    height: 1,
  })
  return (counter: number): (() => void) => {
    const alpha = animation(counter)

    graphics
      .clear()
      .beginFill(0x000000, alpha)
      .drawRect(0, 0, Render.GAME_WIDTH, Render.GAME_HEIGHT)

    // Resolve after half the duration has passed,
    // to allow the next screen to fade in
    if (!hasResolved && counter >= duration / 2) {
      hasResolved = true
      resolve()
    }

    return (): void => {
      graphics.destroy()
    }
  }
}

export default fullscreenFadeInOut
