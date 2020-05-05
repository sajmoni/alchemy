import onChange from 'on-change'

const subscribers = {}

function onChangeFn(path, value, previousValue) {
  if (!subscribers[path]) {
    return
  }

  subscribers[path].forEach((callback) => {
    callback(value, previousValue)
  })
}

/**
 * Enables subscribing to state changes
 */
export const init = (state: any): any => {
  return onChange(state, onChangeFn)
}

/**
 * Get state as a regular JavaScript object. Enables destructuring.
 */
export const target = (state: any): any => onChange.target(state)

type callback = (value: any, previousValue: any) => void

type unsubscribe = () => void

/**
 * Subscribe to state changes
 */
export const subscribe = (path: string, callback: callback): unsubscribe => {
  subscribers[path] = subscribers[path]
    ? subscribers[path].concat(callback)
    : [callback]

  const unsubscribe = () => {
    // * Mutate array for performance reasons
    const indexToRemove = subscribers[path].indexOf(callback)
    if (indexToRemove >= 0) {
      subscribers[path].splice(indexToRemove, 1)
    }
  }

  return unsubscribe
}
