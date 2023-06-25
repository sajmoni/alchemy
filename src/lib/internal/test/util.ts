import type { TimerInstance } from '../timer'

export const willTick = (times: number, update: TimerInstance['update']) => {
  for (let index = 0; index < times; index++) {
    // Queue up calling update
    setTimeout(() => {
      const deltaTime = 1
      update(deltaTime)
    }, 0)
  }
}
