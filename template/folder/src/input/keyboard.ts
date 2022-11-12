import tinykeys from 'tinykeys'
import * as l1 from 'l1'

import { Key } from '~/enum/app'

const pressed: Record<string, boolean> = {}

const createKey = (key: string) => {
  tinykeys(
    window,
    {
      [key]: () => {
        _onKeyUp(key)
      },
    },
    { event: 'keyup' },
  )

  tinykeys(
    window,
    {
      [key]: () => {
        _onKeyDown(key)
      },
    },
    { event: 'keydown' },
  )
}

const initializeKeyboardInput = (keys: string[]) => {
  for (const key of keys) {
    createKey(key)
  }
}

export default initializeKeyboardInput

/**
 * Call on each update to check if key is pressed
 */
export const isKeyDown = (keyCode: string): boolean => {
  return pressed[keyCode]
}

function _onKeyDown(key: string): void {
  pressed[key] = true
}

function _onKeyUp(key: string): void {
  pressed[key] = false
}
export const debouncedKey = (
  key: Key,
  callback: () => void,
  debounceTime: number,
): (() => void) => {
  let timer = debounceTime

  const unsubscribe = tinykeys(
    window,
    {
      [key]: () => {
        timer = 0
      },
    },
    { event: 'keyup' },
  )

  const onUpdate = () => {
    if (isKeyDown(key) && timer === 0) {
      callback()
      timer = debounceTime
    }

    if (timer > 0) {
      timer -= 1
    }
  }

  const behavior = l1.forever(onUpdate, 1)

  const remove = () => {
    l1.remove(behavior)
    unsubscribe()
  }

  return remove
}
