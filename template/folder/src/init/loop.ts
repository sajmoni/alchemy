import * as l1 from 'l1'
import MainLoop from 'mainloop.js'
import { getAverage, roundTo } from 'tiny-toolkit'

import app from '/app'
import state from '/state'

const updateDurations: number[] = []
const drawDurations: number[] = []

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

const makeGetAverageDuration = (list: number[]) => () => {
  const averages = roundTo(getAverage(list), 3)

  list.length = 0

  return averages
}

export const getAverageUpdateDuration = makeGetAverageDuration(updateDurations)

export const getAverageDrawDuration = makeGetAverageDuration(drawDurations)

export default initializeGameLoop
