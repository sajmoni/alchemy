import * as l1 from 'l1'
import * as juice from 'juice.js'

const DEFAULT_DURATION = 45

export default (displayObject, { position, duration = DEFAULT_DURATION }) => new Promise((res) => {
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
    // eslint-disable-next-line no-param-reassign
    displayObject.y = Math.floor(getY(counter))
    displayObject.x = Math.floor(getX(counter))

    if (counter === duration) {
      res()
      l1.remove(b)
    }
  })

  b.id = `easeOutToPosition-${displayObject.name}`
})
