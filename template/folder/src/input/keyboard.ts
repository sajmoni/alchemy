import Mousetrap from 'mousetrap'

const pressed = {}

/**
 * Call on each update to check if key is pressed
 */
export const isKeyDown = (keyCode: string): boolean => {
  return pressed[keyCode]
}

function _onKeyDown(event) {
  pressed[event] = true
}

function _onKeyUp(event) {
  pressed[event] = false
}

/**
 * Enables a key to be used with `isKeyDown`
 */
export function addKey(key: string): void {
  Mousetrap.bind(
    key,
    (event) => {
      event.preventDefault()
      _onKeyDown(key)
    },
    'keydown',
  )
  Mousetrap.bind(
    key,
    (event) => {
      event.preventDefault()
      _onKeyUp(key)
    },
    'keyup',
  )
}
