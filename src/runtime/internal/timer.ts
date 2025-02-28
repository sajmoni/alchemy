import { removeFromList } from 'tiny-toolkit'

import { type CancelablePromise } from '../type.js'

type Timer = {
  type: 'delay' | 'repeatUntil' | 'repeatEvery'
  time: number
  duration: number
}

type Delay = Timer & {
  resolve: (value: boolean) => void
}
const isDelay = (timer: Timer): timer is Delay => timer.type === 'delay'

type RepeatUntil = Timer & {
  resolve: (value: boolean) => void
  callback: (time: number, deltaTime: number) => void
}
const isRepeatUntil = (timer: Timer): timer is RepeatUntil =>
  timer.type === 'repeatUntil'

type RepeatEvery = Timer & {
  callback: (time: number, deltaTime: number) => void
  updateCount: number
  totalTime: number
}
const isRepeatEvery = (timer: Timer): timer is RepeatEvery =>
  timer.type === 'repeatEvery'

export type TimerInstance = ReturnType<typeof createTimer>

export default function createTimer() {
  let timers: Timer[] = []

  /**
   * Wait until `duration` is reached before continuing
   */
  function delay(duration: number) {
    const controller = new AbortController()

    const promise: Partial<CancelablePromise> = new Promise<boolean>(
      (resolve) => {
        const timer: Delay = {
          time: 0,
          duration,
          resolve,
          type: 'delay',
        }
        timers.push(timer)

        controller.signal.addEventListener('abort', () => {
          if (timer.time < timer.duration) {
            removeFromList(timer, timers)
          }
        })
      },
    )

    promise.cancel = () => {
      controller.abort()
    }

    return promise as CancelablePromise
  }

  /**
   * Execute a callback every update until `duration` is reached
   */
  function repeatUntil(
    duration: number,
    callback: (time: number, deltaTime: number) => void,
  ) {
    const controller = new AbortController()

    const promise: Partial<CancelablePromise> = new Promise<boolean>(
      (resolve) => {
        const timer: RepeatUntil = {
          time: 0,
          duration,
          resolve,
          callback,
          type: 'repeatUntil',
        }
        timers.push(timer)

        controller.signal.addEventListener('abort', () => {
          if (timer.time < timer.duration) {
            removeFromList(timer, timers)
          }
        })
      },
    )

    promise.cancel = () => {
      controller.abort()
    }

    return promise as CancelablePromise
  }

  /**
   * Execute a callback every `interval` updates
   */
  function repeatEvery(
    interval: number,
    callback: (time: number, deltaTime: number) => void,
  ): () => void {
    const timer: RepeatEvery = {
      time: 0,
      totalTime: 0,
      duration: interval,
      callback,
      type: 'repeatEvery',
      updateCount: 0,
    }
    timers.push(timer)

    const cancel = () => {
      removeFromList(timer, timers)
    }
    return cancel
  }

  async function update(_deltaTime: number) {
    for (const timer of timers) {
      // Make timer independent on frame rate
      const roundedDeltaTime = Math.round(_deltaTime)
      timer.time += roundedDeltaTime

      const hasReachedDuration = timer.time >= timer.duration

      if (isRepeatUntil(timer)) {
        timer.callback(timer.time, roundedDeltaTime)
        if (hasReachedDuration) {
          timer.resolve(true)
          removeFromList(timer, timers)
        }
      } else if (isDelay(timer) && hasReachedDuration) {
        timer.resolve(true)
        removeFromList(timer, timers)
      } else if (isRepeatEvery(timer)) {
        timer.updateCount += 1
        timer.totalTime += roundedDeltaTime
        if (hasReachedDuration) {
          timer.callback(timer.totalTime, timer.time / timer.updateCount)
          timer.time = 0
          timer.updateCount = 0
        }
      }
    }
  }

  function debug() {
    return {
      timers,
    }
  }

  function destroy() {
    timers = []
  }

  return {
    delay,
    update,
    repeatUntil,
    repeatEvery,
    debug,
    destroy,
  }
}
