import * as l1 from 'l1'
import * as ex from 'pixi-ex'
import MainLoop from 'mainloop.js'
import createPanel from 'nano-panel'
import * as prism from 'state-prism'

import app from './app'
import Sound from './sound'
import state from './state'
import { getAverageUpdateDuration, getAverageDrawDuration } from './loop'

declare global {
  interface Window { debug: any; }
}

const initializeDebugTools = () => {
  // * These commands can be run in the console, e.g: 'debug.state()'
  window.debug = {
    ...window.debug,
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

  if (process.env.NODE_ENV === 'development' && process.env.DEBUG) {
    // const spector = new SPECTOR.Spector()
    const debugItems = [
      {
        type: 'label',
        label: 'fps',
        getData: () => Math.round(MainLoop.getFPS()),
      },
      { type: 'label', label: 'behaviors', getData: () => l1.getAll().length },
      {
        type: 'label',
        label: 'display objects',
        getData: () => ex.getAllChildren(app.stage).length,
      },
      {
        type: 'label',
        label: 'state subscribers',
        getData: () => prism.getSubscriberCount(),
      },
      {
        type: 'label',
        label: 'loop duration',
        threshold: 1,
        getData: () => {
          return getAverageUpdateDuration()
        },
      },
      {
        type: 'label',
        label: 'draw duration',
        threshold: 1,
        getData: () => {
          return getAverageDrawDuration()
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'button',
        label: 'State',
        onClick: () => {
          console.log('state:', prism.target(state))
        },
      },
      {
        type: 'button',
        label: 'Play / Pause',
        onClick: () => {
          state.application.paused = !state.application.paused
        },
      },
      {
        type: 'button',
        label: 'Mute sounds',
        onClick: () => {
          // TODO: Set volume to 0
          console.log('sounds muted')
        },
      },
    ]
    // TODO: Enable this in the future
    // 'draw calls': () => drawCalls,

    const renderPanel = createPanel(debugItems)

    const debug = l1.forever(() => {
      renderPanel()
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
