import type { AnimatedSprite, Application, Sprite, Text } from 'pixi.js'

export default function createUtil(app: Application) {
  const center = <T extends Sprite | Text | AnimatedSprite>(x: T): T => {
    x.anchor.set(0.5)
    x.position.set(app.screen.width / 2, app.screen.height / 2)
    return x
  }
  const util = {
    center,
  }

  return util
}
