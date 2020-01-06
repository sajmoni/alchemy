import onChange from 'on-change'

// eslint-disable-next-line no-underscore-dangle, import/no-mutable-exports
let _state
// eslint-disable-next-line no-underscore-dangle
const _scenes = []

function onChangeFn(path /* value, previousValue */) {
  const state = onChange.target(this)

  _scenes.forEach(([paths, render]) => {
    if (paths.includes(path)) {
      render(state)
    }
  })
}

export const init = (state) => {
  _state = onChange(state, onChangeFn)
}

export const getState = () => onChange.target(_state)

export const connect = (paths, render) => {
  const scene = [paths, render]
  _scenes.push(scene)
  // Return disconnect?
  const disconnect = () => {
    // * Mutate array for performance reasons
    const indexToRemove = _scenes.indexOf(scene)
    if (indexToRemove >= 0) {
      _scenes.splice(indexToRemove, 1)
    }
  }
  return disconnect
}

export { _state as state }
