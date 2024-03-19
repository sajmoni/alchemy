import { Ticker } from 'pixi.js'
import type { TimerInstance } from './timer'
import makeGetAverageDuration from './makeGetAverageDuration'
import type { AlchemyState } from '../type'
import handleError from './handleError'

const updateDurations: number[] = []

export default function initializeTicker<
  State extends object,
  SceneKey extends string,
>(
  state: State & {
    alchemy: AlchemyState<SceneKey>
  },
  global: { timer: TimerInstance },
): Ticker {
  const ticker = new Ticker()

  // Global timers
  if (import.meta.env.MODE === 'production') {
    ticker.add((ticker) => {
      if (!state.alchemy.paused) {
        try {
          global.timer.update(ticker.deltaTime)
          state.alchemy.time += 1
        } catch (error) {
          handleError(state.alchemy, 'Error in global timer', error)
        }
      }
    })
  } else {
    ticker.add((ticker) => {
      if (!state.alchemy.paused) {
        try {
          const beforeUpdate = performance.now()
          global.timer.update(ticker.deltaTime)
          state.alchemy.time += 1
          const afterUpdate = performance.now()
          const loopDuration = afterUpdate - beforeUpdate
          updateDurations.push(loopDuration)
        } catch (error) {
          handleError(state.alchemy, 'Error in global timer', error)
        }
      }
    })
  }

  ticker.maxFPS = 60
  ticker.minFPS = 60

  ticker.start()

  return ticker
}

export const getAverageGlobalUpdateDuration =
  makeGetAverageDuration(updateDurations)
