import onChange from 'on-change'

// TODO: Tests
// TODO: Performance tests

// eslint-disable-next-line import/no-mutable-exports
let state
const subscribers = []

function onChangeFn(path /* value, previousValue */) {
  const currentState = onChange.target(this)

  subscribers.forEach(([paths, callback]) => {
    if (paths.includes(path)) {
      callback(currentState)
    }
  })
}

export const init = (initialState) => {
  state = onChange(initialState, onChangeFn)
}

export const getState = () => onChange.target(state)

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

export { state }
