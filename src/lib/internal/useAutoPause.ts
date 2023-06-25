import type { AlchemyState } from '../type'

const pause = <State, SceneKey extends string>(
  state: State & {
    alchemy: AlchemyState<SceneKey>
  },
): void => {
  state.alchemy.paused = true
}

const play = <State, SceneKey extends string>(
  state: State & {
    alchemy: AlchemyState<SceneKey>
  },
): void => {
  state.alchemy.paused = false
}

const autoPauseIfTabInactive = <State, SceneKey extends string>(
  state: State & {
    alchemy: AlchemyState<SceneKey>
  },
): void => {
  window.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pause(state)
    } else {
      play(state)
    }
  })
}

const autoPauseIfWindowNotFocused = <State, SceneKey extends string>(
  state: State & {
    alchemy: AlchemyState<SceneKey>
  },
): void => {
  window.addEventListener('blur', () => {
    pause(state)
  })
  window.addEventListener('focus', () => {
    play(state)
  })
}

export default function useAutoPause<State, SceneKey extends string>(
  state: State & {
    alchemy: AlchemyState<SceneKey>
  },
): void {
  autoPauseIfTabInactive(state)
  autoPauseIfWindowNotFocused(state)
}
