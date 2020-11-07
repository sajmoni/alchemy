import Mousetrap, { ExtendedKeyboardEvent } from 'mousetrap'

const pressed: Record<string, boolean> = {}

/**
 * Call on each update to check if key is pressed
 */
export const isKeyDown = (keyCode: string): boolean => {
  return pressed[keyCode]
}

function _onKeyDown(key: string) {
  pressed[key] = true
}

function _onKeyUp(key: string) {
  pressed[key] = false
}

/**
 * Enables a key to be used with `isKeyDown`
 */
export function addKey(key: string): void {
  Mousetrap.bind(
    key,
    (event: ExtendedKeyboardEvent) => {
      event.preventDefault()
      _onKeyDown(key)
    },
    'keydown',
  )
  Mousetrap.bind(
    key,
    (event: ExtendedKeyboardEvent) => {
      event.preventDefault()
      _onKeyUp(key)
    },
    'keyup',
  )
}
  