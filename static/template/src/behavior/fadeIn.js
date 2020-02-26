import * as l1 from 'l1'
import * as juice from 'juice.js'

const END_VALUE = 1

export default (displayObject, {
  // endValue = 1,
  duration = 90,
  resolveAt = 0.5,
} = {
  duration: 90,
  resolveAt: 0.5,
}) => new Promise((res) => {
  const getAlpha = juice.easeOut({
    startValue: 0,
    endValue: END_VALUE,
    duration,
  })

  const f = l1.repeat((counter) => {
    // eslint-disable-next-line no-param-reassign
    displayObject.alpha = getAlpha(counter)
    if (counter === (duration * resolveAt)) {
      res()
    }
    if (counter === duration) {
      // eslint-disable-next-line no-param-reassign
      displayObject.alpha = END_VALUE
      l1.remove(f)
    }
  })
})
