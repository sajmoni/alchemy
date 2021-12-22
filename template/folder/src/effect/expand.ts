import * as l1 from 'l1'
import * as juice from 'juice.js'
import * as PIXI from 'pixi.js'

type Options = {
  readonly duration?: number
  readonly endValue?: number
}

const expand = async (
  displayObject: PIXI.DisplayObject,
  { duration = 30, endValue = 1 }: Options = {},
): Promise<void> =>
  new Promise((resolve) => {
    const startValue = displayObject.scale.x
    const getScale = juice.parabola({
      startValue,
      height: endValue,
      duration,
    })

    l1.every(
      (time) => {
        const scale = getScale(time)
        displayObject.scale.set(scale)

        return (): void => {
          displayObject.scale.set(startValue)
          resolve()
        }
      },
      duration,
      { id: `expand-${displayObject.name ?? ''}` },
    )
  })

export default expand
