import * as l1 from 'l1'
import * as PIXI from 'pixi.js'
import app from '/app'
import * as juice from 'juice.js'
import { Render } from '../constant'

const DURATION = 35

const ID = 'fullscreenFadeInOut'

export default async () =>
  new Promise((resolve) => {
    const fade = new PIXI.Graphics()
    fade.zIndex = 1
    app.stage.addChild(fade)

    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const behavior = l1.every(fadeInOut(fade, DURATION, resolve), DURATION)
    behavior.id = ID
  })

const fadeInOut = (graphics, duration, resolve) => {
  let hasResolved = false
  const animation = juice.parabola({
    duration,
    height: 1,
  })
  return (counter) => {
    const alpha = animation(counter)

    graphics
      .clear()
      .beginFill('black', alpha)
      .drawRect(0, 0, Render.GAME_WIDTH, Render.GAME_HEIGHT)

    // Resolve after half the duration has passed,
    // to allow the next screen to fade in
    if (!hasResolved && counter >= duration / 2) {
      hasResolved = true
      resolve()
    }

    return () => {
      graphics.destroy()
    }
  }
}
