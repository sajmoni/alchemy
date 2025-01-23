import type { TimerInstance } from '../timer'

/**
 * Will tick all timers in the next run of the event loop
 *
 * Enables await timerFunction(3) to continue
 */
export const willTick = (times: number, update: TimerInstance['update']) => {
  for (let index = 0; index < times; index++) {
    // Queue up calling update
    setTimeout(() => {
      const deltaTime = 1
      update(deltaTime)
    }, 0)
  }
}
