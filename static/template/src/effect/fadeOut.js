import * as l1 from 'l1'
import * as juice from 'juice.js'

const DURATION = 60
const END_VALUE = 0

export default (displayObject, {resolveAt = 0.5, duration = DURATION, endValue = END_VALUE} = {}) => new Promise((res) => {
  const getAlpha = juice.easeOut({
    startValue: 1,
    endValue,
    duration,
  })
  const fadeOut = l1.repeat((counter) => {
    // eslint-disable-next-line no-param-reassign
    displayObject.alpha = getAlpha(counter)
    if (counter === Math.floor(duration * resolveAt)) {
      res()
    }
    if (counter === duration) {
      displayObject.alpha = endValue
      l1.remove(fadeOut)
    }
  })
  fadeOut.id = `fadeOut-${displayObject.name}`
})
