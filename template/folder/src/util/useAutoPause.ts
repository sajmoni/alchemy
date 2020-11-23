import state from '../state'

const pause = () => {
  state.application.paused = true
}

const play = () => {
  state.application.paused = false
}

const autoPauseIfTabInactive = () => {
  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pause()
    } else {
      play()
    }
  })
}

const autoPauseIfWindowNotFocused = () => {
  window.addEventListener('blur', pause)
  window.addEventListener('focus', play)
}

const useAutoPause = () => {
  autoPauseIfTabInactive()
  autoPauseIfWindowNotFocused()
}

export default useAutoPause
