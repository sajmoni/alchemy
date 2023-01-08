import tinykeys from 'tinykeys'

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

export default function initializeKeyboardInput(keys: string[]) {
  for (const key of keys) {
    createKey(key)
  }
}

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
