import createScreenShake, { type ScreenShakeOptions } from 'screen-shake'
import type { Container } from 'pixi.js'

import type { Timer } from '../type.js'

export default function createUseScreenShake(timer: Timer) {
  return function useScreenShake(
    camera: Container,
    screenShakeOptions: ScreenShakeOptions = {},
  ) {
    const screenShake = createScreenShake(screenShakeOptions)

    timer.repeatEvery(1, (time) => {
      const { angle, offsetX, offsetY } = screenShake.update(time)

      camera.angle = camera.angle + angle
      camera.position.x = camera.x + offsetX
      camera.position.y = camera.y + offsetY
    })

    /**
     * trauma is a number between 0-1
     */
    return screenShake.add
  }
}
