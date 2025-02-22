import createScreenShake, { type ScreenShakeOptions } from 'screen-shake'
import type { Timer } from '../type'
import type { Container } from 'pixi.js'

export default function createUseScreenShake(timer: Timer) {
  return function useScreenShake(
    camera: Container,
    screenShakeOptions: ScreenShakeOptions & {
      speed?: number
    } = {},
  ) {
    const speed = screenShakeOptions.speed || 1
    const screenShake = createScreenShake(screenShakeOptions)

    timer.repeatEvery(1, (time) => {
      const { angle, offsetX, offsetY } = screenShake.update(time * speed)

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
