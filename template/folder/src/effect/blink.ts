import * as l1 from 'l1'
import { DisplayObject } from 'pixi.js'

// * Duration in intervals
const DEFAULT_DURATION = 5
const DEFAULT_INTERVAL = 5

type Options = {
  readonly duration?: number
  readonly interval?: number
}

const blink = async (
  displayObject: DisplayObject,
  { duration = DEFAULT_DURATION, interval = DEFAULT_INTERVAL }: Options = {},
): Promise<void> =>
  new Promise((resolve) => {
    let show = false
    const id = `blink-${displayObject.name ?? ''}`

    l1.forever(
      (counter) => {
        if (show) {
          displayObject.visible = false
          show = false
        } else {
          displayObject.visible = true
          show = true
        }

        if (counter === duration * interval) {
          l1.remove(id)
          displayObject.visible = true
          resolve()
        }
      },
      interval,
      { id },
    )
  })

export default blink
