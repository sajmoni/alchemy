import MainLoop from 'mainloop.js'
import * as prism from '../util/prism'

// * Auto pause the game when the browser tab is not active
const autoPause = () => {
  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      prism.state.application.paused = true
    } else {
      prism.state.application.paused = false
    }
  })
}
export default autoPause
