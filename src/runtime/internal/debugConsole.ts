import type { Application } from 'pixi.js'
import { snapshot } from 'valtio'

import type { InternalState } from '../type.js'
import getAllChildren from '../module/getAllChildren.js'

export default function initializeDebugConsole<
  State extends object,
  SceneKey extends string,
>(state: State, internalState: InternalState<SceneKey>, app: Application) {
  // * These commands can be run in the console, e.g: 'debug.state()'
  ;(window as any).debug = {
    state: () => {
      return snapshot(state)
    },
    'internal state': () => {
      return snapshot(internalState)
    },
    info: () => {
      console.table({
        'Pixi objects': getAllChildren(app.stage).length,
      })
    },
    // sound: () => {
    //   Sound.sound.coin.play();
    // },
  }
}
