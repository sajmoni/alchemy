import state from '~/state'

const pause = (): void => {
  state.application.paused = true
}

const play = (): void => {
  state.application.paused = false
}

const autoPauseIfTabInactive = (): void => {
  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pause()
    } else {
      play()
    }
  })
}

const autoPauseIfWindowNotFocused = (): void => {
  window.addEventListener('blur', pause)
  window.addEventListener('focus', play)
}

export default function useAutoPause(): void {
  autoPauseIfTabInactive()
  autoPauseIfWindowNotFocused()
}
