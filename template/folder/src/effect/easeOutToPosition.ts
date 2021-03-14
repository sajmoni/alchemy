import * as l1 from 'l1'
import * as juice from 'juice.js'
import * as PIXI from 'pixi.js'
import { Position } from '/type/position'

const DEFAULT_DURATION = 45

type Options = {
  readonly position: Position
  readonly duration?: number
}

const easeOutToPosition = async (
  displayObject: PIXI.DisplayObject,
  { position, duration = DEFAULT_DURATION }: Options,
): Promise<void> =>
  new Promise((resolve) => {
    const getY = juice.easeOut({
      startValue: displayObject.y,
      endValue: position.y,
      duration,
    })
    const getX = juice.easeOut({
      startValue: displayObject.x,
      endValue: position.x,
      duration,
    })
    const b = l1.every((counter) => {
      displayObject.y = Math.floor(getY(counter))
      displayObject.x = Math.floor(getX(counter))

      return (): void => {
        resolve()
      }
    }, duration)

    b.id = `easeOutToPosition-${displayObject.name ?? ''}`
  })

export default easeOutToPosition
