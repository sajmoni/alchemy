import onChange from 'on-change'

const subscribers = []

function onChangeFn(path, value, previousValue) {
  subscribers.forEach(([paths, callback]) => {
    if (paths.includes(path)) {
      // TODO: Handle paths as array
      callback(value, previousValue)
    }
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
 * @param {string[]|string} paths
 * @param {(value: any, previousValue: any) => void} callback
 */
export const subscribe = (paths, callback) => {
  const subscriber = [paths, callback]
  subscribers.push(subscriber)

  const unsubscribe = () => {
    // * Mutate array for performance reasons
    const indexToRemove = subscribers.indexOf(subscriber)
    if (indexToRemove >= 0) {
      subscribers.splice(indexToRemove, 1)
    }
  }

  return unsubscribe
}
