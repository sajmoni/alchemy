import * as l1 from 'l1'
import * as juice from 'juice.js'
import * as PIXI from 'pixi.js'

const DURATION = 60
const END_VALUE = 0

type Options = {
  readonly duration?: number
  readonly resolveAt?: number
  readonly endValue?: number
}

const fadeOut = async (
  displayObject: PIXI.DisplayObject,
  { resolveAt = 0.5, duration = DURATION, endValue = END_VALUE }: Options = {},
): Promise<void> =>
  new Promise((resolve) => {
    const getAlpha = juice.easeOut({
      startValue: 1,
      endValue,
      duration,
    })
    const fadeOut = l1.every((counter) => {
      displayObject.alpha = getAlpha(counter)
      if (counter === Math.floor(duration * resolveAt)) {
        resolve()
      }

      return (): void => {
        displayObject.alpha = endValue
      }
    }, duration)

    fadeOut.id = `fadeOut-${displayObject.name}`
  })

export default fadeOut
