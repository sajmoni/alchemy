import * as l1 from 'l1'
import MainLoop from 'mainloop.js'
import app from './app'

const DEBUG = true

let updateDurations = []
let drawDurations = []

const initializeGameLoop = () => {
  if (process.env.NODE_ENV === 'development' && DEBUG) {
    MainLoop.setUpdate((deltaTime) => {
      const beforeUpdate = performance.now()

      // 16.6 -> 1
      l1.update(deltaTime / (1000 / 60))

      const afterUpdate = performance.now()
      const loopDuration = afterUpdate - beforeUpdate
      updateDurations.push(loopDuration)
    })
  } else {
    MainLoop.setUpdate((deltaTime) => {
      // 16.6 -> 1
      l1.update(deltaTime / (1000 / 60))
    })
  }

  if (process.env.NODE_ENV === 'development' && DEBUG) {
    MainLoop.setDraw(() => {
      const beforeDraw = performance.now()

      app.renderer.render(app.stage)

      const afterDraw = performance.now()
      const drawDuration = afterDraw - beforeDraw
      drawDurations.push(drawDuration)
    })
  } else {
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

const getAverage = (list: number[]) => {
  const average = list.reduce((acc, ts) => acc + ts, 0) / (list.length || 1)

  return average.toFixed(3)
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
