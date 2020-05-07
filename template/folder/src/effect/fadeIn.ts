import * as l1 from 'l1'
import * as juice from 'juice.js'
import * as PIXI from 'pixi.js'

const END_VALUE = 1

type Options = {
  readonly duration?: number
  readonly resolveAt?: number
  readonly endValue?: number
}

export default async (
  displayObject: PIXI.DisplayObject,
  { duration = 90, resolveAt = 0.5, endValue = END_VALUE }: Options = {},
) =>
  new Promise((resolve) => {
    const getAlpha = juice.easeOut({
      startValue: 0,
      endValue,
      duration,
    })

    const fadeIn = l1.repeat((counter) => {
      displayObject.alpha = getAlpha(counter)
      if (counter === Math.floor(duration * resolveAt)) {
        resolve()
      }

      if (counter === duration) {
        displayObject.alpha = endValue
        l1.remove(fadeIn)
      }
    })

    fadeIn.id = `fadeIn-${displayObject.name}`
  })
