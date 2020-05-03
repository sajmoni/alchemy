import fadeOut from './fadeOut'
import blink from './blink'
import fullscreenFadeInOut from './fullscreenFadeInOut'

export default (displayObject, otherObjects) => {
  blink(displayObject)
  return Promise.all(otherObjects.map(fadeOut)).then(fullscreenFadeInOut)
}
