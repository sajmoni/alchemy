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

export default async (
  displayObject: PIXI.DisplayObject,
  { resolveAt = 0.5, duration = DURATION, endValue = END_VALUE }: Options = {},
) =>
  new Promise((resolve) => {
    const getAlpha = juice.easeOut({
      startValue: 1,
      endValue,
      duration,
    })
    const fadeOut = l1.repeat((counter) => {
      displayObject.alpha = getAlpha(counter)
      if (counter === Math.floor(duration * resolveAt)) {
        resolve()
      }

      if (counter === duration) {
        displayObject.alpha = endValue
        l1.remove(fadeOut)
      }
    })

    fadeOut.id = `fadeOut-${displayObject.name}`
  })
