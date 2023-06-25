import { Application, Container, Sprite, Texture } from 'pixi.js'
import type { Position, Timer } from '../type'
import getRenderTexture from './getRenderTexture'

export default function createUseLightMask(app: Application, timer: Timer) {
  return function useLightMask() {
    const renderTexture = getRenderTexture(app)

    const lightContainer = new Container()

    let renders: [Container, (light: Container) => void][] = []

    timer.repeatEvery(1, () => {
      for (const [light, render] of renders) {
        render(light)
      }

      app.renderer.render(lightContainer, {
        renderTexture,
        clear: true,
      })
    })

    const lightMask = new Sprite(renderTexture)

    return {
      getLightMask: () => lightMask,
      create: ({
        texture,
        getPosition,
      }: {
        texture: Texture
        getPosition: () => Position
      }) => {
        const light = new Sprite(texture)
        light.anchor.set(0.5)
        lightContainer.addChild(light)

        const render = (light: Container) => {
          const position = getPosition()
          light.position.set(position.x, position.y)
        }

        renders.push([light, render])

        return light
      },
    }
  }
}
