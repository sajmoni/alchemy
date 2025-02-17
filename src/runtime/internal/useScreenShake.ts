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

    // We remove the previous screen shake to make it work with a non-static camera
    let previousScreenShake:
      | { angle: number; offsetX: number; offsetY: number }
      | undefined

    timer.repeatEvery(1, (time) => {
      const { angle, offsetX, offsetY } = screenShake.update(time * speed)

      camera.angle = camera.angle + angle - (previousScreenShake?.angle ?? 0)
      camera.position.x =
        camera.x + offsetX - (previousScreenShake?.offsetX ?? 0)
      camera.position.y =
        camera.y + offsetY - (previousScreenShake?.offsetY ?? 0)

      previousScreenShake = { angle, offsetX, offsetY }
    })

    // TODO: Return only add function?
    return {
      add: screenShake.add,
    }
  }
}
