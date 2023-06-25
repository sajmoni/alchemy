import type { Application } from 'pixi.js'
import { snapshot } from 'valtio'

import type { AlchemyState } from '../type'
import getAllChildren from '../module/getAllChildren'

export default function initializeDebugConsole<
  State extends object,
  SceneKey extends string,
>(
  state: State & {
    alchemy: AlchemyState<SceneKey>
  },
  app: Application,
) {
  // * These commands can be run in the console, e.g: 'debug.state()'
  ;(window as any).debug = {
    state: () => {
      return snapshot(state)
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
