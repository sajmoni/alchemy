import * as l1 from 'l1'
import * as PIXI from 'pixi.js'

// * Duration in intervals
const DEFAULT_DURATION = 5
const DEFAULT_INTERVAL = 5

type Options = {
  readonly duration?: number
  readonly interval?: number
}

const blink = (
  displayObject: PIXI.DisplayObject,
  { duration = DEFAULT_DURATION, interval = DEFAULT_INTERVAL }: Options = {},
) => {
  let show = false
  const blink = l1.forever((counter) => {
    if (show) {
      displayObject.visible = false
      show = false
    } else {
      displayObject.visible = true
      show = true
    }

    if (counter === duration * interval) {
      l1.remove(blink)
      displayObject.visible = true
    }
  }, interval)

  blink.id = `blink-${displayObject.name}`
}

export default blink
