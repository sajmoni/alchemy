import * as PIXI from 'pixi.js'

import fadeOut from './fadeOut'
import blink from './blink'
import fullscreenFadeInOut from './fullscreenFadeInOut'

export default async (
  displayObject: PIXI.DisplayObject,
  otherObjects: readonly PIXI.DisplayObject[],
) => {
  blink(displayObject)
  return Promise.all(
    otherObjects.map(async (otherObject) => {
      return fadeOut(otherObject)
    }),
  ).then(fullscreenFadeInOut)
}
