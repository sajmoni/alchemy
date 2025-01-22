import { tinykeys } from 'tinykeys'
import type { TupleToUnion } from 'type-fest'
import type { TimerInstance } from './timer'

export default function initializeKeyboardInput<const Key extends string>(
  keys: readonly Key[],
  timer: TimerInstance,
) {
  const pressed: Map<Key, boolean> = new Map()
  let unsubscribes: Array<() => void> = []

  for (const key of keys) {
    pressed.set(key, false)

    const unsubscribe = tinykeys(
      window,
      {
        [key]: () => {
          pressed.set(key, false)
        },
      },
      { event: 'keyup' },
    )
    unsubscribes.push(unsubscribe)

    const unsubscribe2 = tinykeys(
      window,
      {
        [key]: () => {
          pressed.set(key, true)
        },
      },
      { event: 'keydown' },
    )
    unsubscribes.push(unsubscribe2)
  }

  /**
   * Call on each update to check if key is pressed
   */
  function isKeyDown(
    keyCode: TupleToUnion<typeof keys> | TupleToUnion<typeof keys>[],
  ): boolean {
    if (Array.isArray(keyCode)) {
      return keyCode.some((key) => pressed.get(key) === true)
    }
    return pressed.get(keyCode) === true
  }

  const debouncedKey = (
    key: TupleToUnion<typeof keys>,
    callback: () => void,
    debounceTime: number,
  ): (() => void) => {
    let time = debounceTime

    const unsubscribe = tinykeys(
      window,
      {
        [key]: () => {
          time = 0
        },
      },
      { event: 'keyup' },
    )

    const onUpdate = () => {
      if (isKeyDown(key) && time === 0) {
        callback()
        time = debounceTime
      }

      if (time > 0) {
        time -= 1
      }
    }

    const cancelTimer = timer.repeatEvery(1, onUpdate)

    const remove = () => {
      cancelTimer()
      unsubscribe()
    }

    return remove
  }

  return {
    isKeyDown,
    unsubscribe: () => {
      for (const unsubscribe of unsubscribes) {
        unsubscribe()
      }
    },
    debouncedKey,
  }
}
