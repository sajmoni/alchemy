import * as l1 from 'l1'
import * as ex from 'pixi-ex'
import MainLoop from 'mainloop.js'
import debugOverlay from './util/debugOverlay'

import app from './app'
import Sound from './sound'
import state from './state'
import { getAverageUpdateDuration, getAverageDrawDuration } from './loop'

// TODO: Move to settings file and default from env variable
const DEBUG = true

const initializeDebugTools = () => {
  // * These commands can be run in the console, e.g: 'debug.state()'
  window['debug'] = {
    ...window['debug'],
    state: () => state,
    info: () => ({
      'display objects': ex.getAllChildren(app.stage).length,
      'amount of behaviors': l1.getAll().length,
      behaviors: l1.getAll(),
    }),
    sound: () => {
      Sound.SWORD_01.play()
    },
  }

  if (process.env.NODE_ENV === 'development' && DEBUG) {
    // const spector = new SPECTOR.Spector()
    const debugItems = [
      { label: 'fps', getData: () => Math.round(MainLoop.getFPS()) },
      { label: 'behaviors', getData: () => l1.getAll().length },
      {
        label: 'display objects',
        getData: () => ex.getAllChildren(app.stage).length,
      },
      {
        label: 'loop duration',
        threshold: 1,
        getData: () => {
          return getAverageUpdateDuration()
        },
      },
      {
        label: 'draw duration',
        threshold: 1,
        getData: () => {
          return getAverageDrawDuration()
        },
      },
    ]
    // TODO: Enable this in the future
    // 'draw calls': () => drawCalls,

    const renderDebugOverlay = debugOverlay(debugItems)

    const debug = l1.forever(() => {
      renderDebugOverlay()
      // TODO: Enable this in the future
      // spector.captureNextFrame(app.view, true)
      // spector.onCapture.add((res) => {
      //   drawCalls = res.commands.filter(c => c.name === 'drawElements').length
      // })
    }, 60)
    debug.id = 'debug'
  }
}

export default initializeDebugTools
