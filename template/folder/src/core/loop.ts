import * as l1 from 'l1'
import MainLoop from 'mainloop.js'
import { truncateSync } from 'node:fs'
import { getAverage, roundTo } from 'tiny-toolkit'

import app from '/app'
import env from '/env'
import state from '/state'
import handleError from '/util/handleError'

const updateDurations: number[] = []
const drawDurations: number[] = []

const update = (deltaTime: number): void => {
  try {
    // 16.6 -> 1
    l1.update(deltaTime / (1000 / 60))
  } catch (error) {
    handleError('Error in core loop', error)
  }
}

const initializeGameLoop = (): void => {
  if (env.DEBUG) {
    MainLoop.setUpdate((deltaTime) => {
      if (state.application.paused) {
        return
      }

      const beforeUpdate = performance.now()

      update(deltaTime)

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

      update(deltaTime)
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

const makeGetAverageDuration = (list: number[]) => (): number => {
  const averages = roundTo(getAverage(list), 3)

  list.length = 0

  return averages
}

export const getAverageUpdateDuration = makeGetAverageDuration(updateDurations)

export const getAverageDrawDuration = makeGetAverageDuration(drawDurations)

export default initializeGameLoop
