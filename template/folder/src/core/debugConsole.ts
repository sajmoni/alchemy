import { Instance } from 'l1'
import { getAllChildren } from 'pixi-ex'
import { snapshot } from 'valtio'

import app from '~/app'
import state from '~/state'
import Sound from '~/sound'

const initializeDebugConsole = (l1: Instance) => {
  // * These commands can be run in the console, e.g: 'debug.state()'
  ;(window as any).debug = {
    state: () => snapshot(state),
    info: () => ({
      'display objects': getAllChildren(app.stage).length,
      'amount of behaviors': l1.getAll().length,
      behaviors: l1.getAll(),
    }),
    sound: () => {
      Sound.sound.coin.play()
    },
  }
}

export default initializeDebugConsole
