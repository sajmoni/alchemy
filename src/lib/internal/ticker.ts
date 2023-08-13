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
  const ticker = Ticker.shared

  // Global timers
  if (import.meta.env.MODE === 'production') {
    ticker.add((deltaTime) => {
      if (!state.alchemy.paused) {
        try {
          global.timer.update(deltaTime)
        } catch (error) {
          handleError(state.alchemy, 'Error in global timer', error)
        }
      }
    })
  } else {
    ticker.add((deltaTime) => {
      if (!state.alchemy.paused) {
        try {
          const beforeUpdate = performance.now()
          global.timer.update(deltaTime)
          const afterUpdate = performance.now()
          const loopDuration = afterUpdate - beforeUpdate
          updateDurations.push(loopDuration)
        } catch (error) {
          handleError(state.alchemy, 'Error in global timer', error)
        }
      }
    })
  }

  // Set this to prevent starting this ticker when listeners are added.
  // By default this is true only for the PIXI.Ticker.shared instance.
  ticker.autoStart = false

  ticker.maxFPS = 60

  // FYI, call this to ensure the ticker is stopped. It should be stopped
  // if you have not attempted to render anything yet.
  ticker.stop()

  // Call this when you are ready for a running shared ticker.
  ticker.start()

  return ticker
}

export const getAverageGlobalUpdateDuration =
  makeGetAverageDuration(updateDurations)
