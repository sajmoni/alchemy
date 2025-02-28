import type { AnimateOptions, JuiceFn, Timer, Animation } from '../type.js'

const createSine =
  ({ duration, startValue, endValue }: Required<AnimateOptions>): JuiceFn =>
  (t) => {
    const middle = (startValue + endValue) / 2
    return (
      middle + (middle - startValue) * Math.sin((t * Math.PI * 2) / duration)
    )
  }

const createEaseOut = ({
  duration,
  startValue,
  endValue,
}: Required<AnimateOptions>): JuiceFn => {
  const functionHeight = startValue - endValue
  const speedParameter = Math.log(1 / 100) / duration

  return (t) => endValue + functionHeight * Math.E ** (t * speedParameter)
}

const createEaseIn = ({
  duration,
  startValue,
  endValue,
}: Required<AnimateOptions>): JuiceFn => {
  const speedParameter =
    Math.log(1 + Math.abs(startValue - endValue)) / duration

  const modifier = endValue < startValue ? -1 : 1

  return (t) => {
    return startValue + (Math.E ** (t * speedParameter) - 1) * modifier
  }
}

type AdditionalFields = {
  onUpdate: (value: number, deltaTime: number) => void
}

export default function animate(timer: Timer) {
  return {
    sine: ({
      onUpdate,
      duration,
      startValue = 0,
      endValue = 1,
    }: AdditionalFields & AnimateOptions): Animation => {
      const getValue = createSine({
        endValue,
        duration,
        startValue,
      })
      const cancel = timer.repeatEvery(1, (time, deltaTime) => {
        onUpdate(getValue(time), deltaTime)
      })
      return { cancel }
    },
    easeOut: ({
      onUpdate,
      duration,
      startValue = 0,
      endValue = 1,
    }: AdditionalFields & AnimateOptions): Promise<boolean> & Animation => {
      const getValue = createEaseOut({
        endValue,
        duration,
        startValue,
      })
      return timer.repeatUntil(duration, (time, deltaTime) => {
        onUpdate(getValue(time), deltaTime)
      })
    },
    easeIn: ({
      onUpdate,
      duration,
      startValue = 0,
      endValue = 1,
    }: AdditionalFields & AnimateOptions): Promise<boolean> & Animation => {
      const getValue = createEaseIn({
        endValue,
        duration,
        startValue,
      })

      return timer.repeatUntil(duration, (time, deltaTime) => {
        onUpdate(getValue(time), deltaTime)
      })
    },
    linear: ({
      onUpdate,
      duration,
      startValue = 0,
      endValue = 1,
    }: AdditionalFields & AnimateOptions): Promise<boolean> & Animation => {
      const interval = endValue - startValue
      const getValue = (time: number) => {
        const progress = time / duration
        return startValue + interval * progress
      }

      return timer.repeatUntil(duration, (time, deltaTime) => {
        onUpdate(getValue(time), deltaTime)
      })
    },
  }
}
