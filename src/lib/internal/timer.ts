import { removeFromList } from 'tiny-toolkit'
import { type CancelablePromise } from '../type'

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
}
const isRepeatEvery = (timer: Timer): timer is RepeatEvery =>
  timer.type === 'repeatEvery'

export type TimerInstance = ReturnType<typeof createTimer>

export default function createTimer() {
  let timers: Timer[] = []

  async function delay(duration: number) {
    const controller = new AbortController()

    const promise: Partial<CancelablePromise> = new Promise((resolve) => {
      const timer: Delay = { time: 0, duration, resolve, type: 'delay' }
      timers.push(timer)

      controller.signal.addEventListener('abort', () => {
        if (timer.time < timer.duration) {
          removeFromList(timer, timers)
        }
      })
    })

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
      duration: interval,
      callback,
      type: 'repeatEvery',
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
      } else if (isRepeatEvery(timer) && timer.time % timer.duration === 0) {
        timer.callback(timer.time, roundedDeltaTime)
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
