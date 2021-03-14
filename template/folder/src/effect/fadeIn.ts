import * as l1 from 'l1'
import * as juice from 'juice.js'
import * as PIXI from 'pixi.js'

const END_VALUE = 1

type Options = {
  readonly duration?: number
  readonly resolveAt?: number
  readonly endValue?: number
}

const fadeIn = async (
  displayObject: PIXI.DisplayObject,
  { duration = 90, resolveAt = 0.5, endValue = END_VALUE }: Options = {},
): Promise<void> =>
  new Promise((resolve) => {
    const getAlpha = juice.easeOut({
      startValue: 0,
      endValue,
      duration,
    })

    const fadeIn = l1.every((counter) => {
      displayObject.alpha = getAlpha(counter)
      if (counter === Math.floor(duration * resolveAt)) {
        resolve()
      }

      return (): void => {
        displayObject.alpha = endValue
      }
    }, duration)

    fadeIn.id = `fadeIn-${displayObject.name ?? ''}`
  })

export default fadeIn
