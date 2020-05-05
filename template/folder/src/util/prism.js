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
 * @param {object} initialState
 */
export const init = (initialState) => {
  return onChange(initialState, onChangeFn)
}

/**
 * Get state as a regular JavaScript object
 * @param {object} state
 */
export const target = (state) => onChange.target(state)

/**
 * @param {string} path
 * @param {(value: any, previousValue: any) => void} callback
 */
export const subscribe = (path, callback) => {
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
