import * as l1 from 'l1'

// * Duration in intervals
const DEFAULT_DURATION = 5
const DEFAULT_INTERVAL = 5

export default (displayObject, { duration = DEFAULT_DURATION, interval = DEFAULT_INTERVAL} = {}) => {
  let show = false
  const blink = l1.repeat((counter) => {
    if (show) {
      // eslint-disable-next-line no-param-reassign
      displayObject.visible = false
      show = false
    } else {
      // eslint-disable-next-line no-param-reassign
      displayObject.visible = true
      show = true
    }
    if (counter === duration * interval) {
      l1.remove(blink)
      // eslint-disable-next-line no-param-reassign
      displayObject.visible = true
    }
  }, interval)

  blink.id = `blink-${displayObject.name}`
}
