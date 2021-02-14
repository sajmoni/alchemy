import * as PIXI from 'pixi.js'
import * as l1 from 'l1'

import fadeOut from './fadeOut'
import blink from './blink'
import fullscreenFadeInOut from './fullscreenFadeInOut'

const BEHAVIORS_TO_KEEP = new Set(['fullscreenFadeInOut', 'debug'])

const clickBlink = async (
  displayObject: PIXI.DisplayObject,
  otherObjects: readonly PIXI.DisplayObject[],
): Promise<void> => {
  void blink(displayObject)
  return Promise.all(
    otherObjects.map(async (otherObject) => {
      return fadeOut(otherObject)
    }),
  )
    .then(fullscreenFadeInOut)
    .then(() => {
      l1.getAll()
        .filter(({ id }) => id && !BEHAVIORS_TO_KEEP.has(id))
        .forEach((behavior) => {
          l1.remove(behavior)
        })
    })
}

export default clickBlink
