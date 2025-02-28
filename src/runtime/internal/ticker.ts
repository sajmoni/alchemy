import { Ticker } from 'pixi.js'

import type { TimerInstance } from './timer.js'
import makeGetAverageDuration from './makeGetAverageDuration.js'
import type { InternalState } from '../type.js'
import handleError from './handleError.js'

const updateDurations: number[] = []

export default function initializeTicker<SceneKey extends string>(
  internalState: InternalState<SceneKey>,
  global: { timer: TimerInstance },
): Ticker {
  const ticker = new Ticker()

  // Global timers
  if (import.meta.env.MODE === 'production') {
    ticker.add((ticker) => {
      if (!internalState.paused) {
        try {
          global.timer.update(ticker.deltaTime)
          internalState.time += 1
        } catch (error) {
          handleError(internalState, 'Error in global timer', error)
        }
      }
    })
  } else {
    ticker.add((ticker) => {
      if (!internalState.paused) {
        try {
          const beforeUpdate = performance.now()
          global.timer.update(ticker.deltaTime)
          internalState.time += 1
          const afterUpdate = performance.now()
          const loopDuration = afterUpdate - beforeUpdate
          updateDurations.push(loopDuration)
        } catch (error) {
          handleError(internalState, 'Error in global timer', error)
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
