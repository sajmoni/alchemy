import * as l1 from 'l1'
import MainLoop from 'mainloop.js'

import app from './app'
import state from './state'

let updateDurations: number[] = []
let drawDurations: number[] = []

const initializeGameLoop = () => {
  if (process.env.NODE_ENV === 'development' && process.env.DEBUG) {
    MainLoop.setUpdate((deltaTime) => {
      if (state.application.paused) {
        return
      }

      const beforeUpdate = performance.now()

      // 16.6 -> 1
      l1.update(deltaTime / (1000 / 60))

      const afterUpdate = performance.now()
      const loopDuration = afterUpdate - beforeUpdate
      updateDurations.push(loopDuration)
    })

    MainLoop.setDraw(() => {
      const beforeDraw = performance.now()

      app.renderer.render(app.stage)

      const afterDraw = performance.now()
      const drawDuration = afterDraw - beforeDraw
      drawDurations.push(drawDuration)
    })
  } else {
    MainLoop.setUpdate((deltaTime) => {
      if (state.application.paused) {
        return
      }

      // 16.6 -> 1
      l1.update(deltaTime / (1000 / 60))
    })

    MainLoop.setDraw(() => {
      app.renderer.render(app.stage)
    })
  }

  MainLoop.setEnd((_, panic) => {
    if (panic) {
      console.warn('Main loop took too long to finish. Resetting frame delta')
      MainLoop.resetFrameDelta()
    }
  })
}

const getAverage = (list: number[]): number => {
  // eslint-disable-next-line unicorn/no-reduce
  const average = list.reduce((acc, ts) => acc + ts, 0) / (list.length || 1)

  return Number.parseFloat(average.toFixed(3))
}

export const getAverageUpdateDuration = () => {
  const averageUpdateDuration = getAverage(updateDurations)

  updateDurations = []

  return averageUpdateDuration
}

export const getAverageDrawDuration = () => {
  const averageDrawDuration = getAverage(drawDurations)

  drawDurations = []

  return averageDrawDuration
}

export default initializeGameLoop
