import * as l1 from 'l1'
import * as juice from 'juice.js'
import { Container } from 'pixi.js'

type Options = {
  duration?: number
  resolveAt?: number
  endValue?: number
}

const fadeIn = async (
  displayObject: Container,
  { duration = 90, resolveAt = 0.5, endValue = 1 }: Options = {},
): Promise<void> =>
  new Promise((resolve) => {
    const getAlpha = juice.easeOut({
      startValue: 0,
      endValue,
      duration,
    })

    l1.every(
      (counter) => {
        displayObject.alpha = getAlpha(counter)
        if (counter === Math.floor(duration * resolveAt)) {
          resolve()
        }

        return (): void => {
          displayObject.alpha = endValue
        }
      },
      duration,
      { id: `fadeIn-${displayObject.name ?? ''}` },
    )
  })

export default fadeIn
