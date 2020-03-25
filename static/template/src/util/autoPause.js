import state from '../state'

// * Auto pause the game when the browser tab is not active
const autoPause = () => {
  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      state.application.paused = true
    } else {
      state.application.paused = false
    }
  })
}
export default autoPause
