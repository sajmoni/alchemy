import onChange from 'on-change'

const subscribers = []

function onChangeFn(path /* value, previousValue */) {
  const currentState = onChange.target(this)

  subscribers.forEach(([paths, callback]) => {
    if (paths.includes(path)) {
      callback(currentState)
    }
  })
}

// Maybe init should return the state for it being handled in userland??
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
 * @param {(state) => void} callback
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
