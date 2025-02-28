import type { InternalState } from '../type.js'

const pause = <SceneKey extends string>(
  internalState: InternalState<SceneKey>,
): void => {
  internalState.paused = true
}

const play = <SceneKey extends string>(
  internalState: InternalState<SceneKey>,
): void => {
  internalState.paused = false
}

const autoPauseIfTabInactive = <SceneKey extends string>(
  internalState: InternalState<SceneKey>,
): void => {
  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pause(internalState)
    } else {
      play(internalState)
    }
  })
}

const autoPauseIfWindowNotFocused = <SceneKey extends string>(
  internalState: InternalState<SceneKey>,
): void => {
  window.addEventListener('blur', () => {
    pause(internalState)
  })
  window.addEventListener('focus', () => {
    play(internalState)
  })
}

export default function useAutoPause<SceneKey extends string>(
  internalState: InternalState<SceneKey>,
): void {
  autoPauseIfTabInactive(internalState)
  autoPauseIfWindowNotFocused(internalState)
}
