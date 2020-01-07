import onChange from 'on-change'

// eslint-disable-next-line no-underscore-dangle, import/no-mutable-exports
let state
// eslint-disable-next-line no-underscore-dangle
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
  const scene = [paths, callback]
  subscribers.push(scene)

  const unsubscribe = () => {
    // * Mutate array for performance reasons
    const indexToRemove = subscribers.indexOf(scene)
    if (indexToRemove >= 0) {
      subscribers.splice(indexToRemove, 1)
    }
  }

  return unsubscribe
}

export { state }
