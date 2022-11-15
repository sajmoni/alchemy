import * as l1 from 'l1'
import * as juice from 'juice.js'
import { DisplayObject } from 'pixi.js'

import { Position } from '~/type/app'

type Options = {
  readonly position: Position
  readonly duration?: number
}

const easeOutToPosition = async (
  displayObject: DisplayObject,
  { position, duration = 45 }: Options,
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

    l1.every(
      (counter) => {
        displayObject.y = Math.floor(getY(counter))
        displayObject.x = Math.floor(getX(counter))

        return (): void => {
          resolve()
        }
      },
      duration,
      { id: `easeOutToPosition-${displayObject.name ?? ''}` },
    )
  })

export default easeOutToPosition
