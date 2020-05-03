import * as l1 from 'l1'
import * as juice from 'juice.js'

const DEFAULT_DURATION = 45

export default (displayObject, { position, duration = DEFAULT_DURATION }) =>
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
    const b = l1.repeat((counter) => {
      displayObject.y = Math.floor(getY(counter))
      displayObject.x = Math.floor(getX(counter))

      if (counter === duration) {
        resolve()
        l1.remove(b)
      }
    })

    b.id = `easeOutToPosition-${displayObject.name}`
  })
