import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import * as prism from './util/prism'
import app from './app'
import game from './game'
import state from './state'
import debugOverlay from './util/debugOverlay'
import autoFullScreen from './util/autoFullScreen'

const VERSION = process.env.VERSION || 'N/A'
console.log(`Version: ${VERSION}`)

const DEBUG = true

document
  .getElementById('game')
  .appendChild(app.renderer.view)


let loopDurations = []

if (DEBUG) {
  app.ticker.add((deltaTime) => {
    if (deltaTime > 1.2) {
      console.warn('Game loop did not finish in time. UPS dropped to 30')
    }

    const before = performance.now()

    l1.update(deltaTime)

    const after = performance.now()

    const delta = after - before
    loopDurations.push(delta)
  })
} else {
  app.ticker.add(l1.update)
}

prism.init(state)

// TODO: Automatically read and load sprite sheets?
app.loader.add('spritesheet/spritesheet.json')

// Experimental API's are not supported by typescript
// @ts-ignore
document.fonts.load('10pt "patchy-robots"')
  .then(() => {
    app.loader.load(() => {
      ex.init(app)
      autoFullScreen()

      game()

      // * Attempt to improve performance
      app.renderer.plugins.prepare.upload(app.stage, () => {
        app.ticker.start()
      })
    })
  })
  .catch(() => {
    console.error('Unable to load font')
  })

// * These commands can be run in the console, e.g: 'debug.state()'
window['debug'] = {
  ...window['debug'],
  state: () => prism.getState(),
  info: () => ({
    'display objects': ex.getAllChildren(app.stage).length,
    behaviors: l1.getAll().length,
  }),
}

if (process.env.NODE_ENV === 'development' && DEBUG) {
  // const spector = new SPECTOR.Spector()
  const debugItems = [
    { label: 'ups', getData: () => Math.floor(app.ticker.FPS) },
    // { label: 'fps', getData: () => Math.floor(spector.getFps())},
    { label: 'behaviors', getData: () => l1.getAll().length },
    { label: 'display objects', getData: () => ex.getAllChildren(app.stage).length },
    {
      label: 'loop duration',
      threshold: 1,
      getData: () => {
        const averageLoopDuration = loopDurations
          .reduce((acc, ts) => acc + ts, 0)
      / (loopDurations.length || 1)

        loopDurations = []

        return averageLoopDuration.toFixed(3)
      },
    },
  ]
  // TODO: Enable this in the future
  // 'draw calls': () => drawCalls,

  const renderDebugOverlay = debugOverlay(debugItems)

  const debug = l1.repeat(() => {
    renderDebugOverlay()
    // TODO: Enable this in the future
    // spector.captureNextFrame(app.view, true)
    // spector.onCapture.add((res) => {
    //   drawCalls = res.commands.filter(c => c.name === 'drawElements').length
    // })
  }, 60)
  debug.id = 'debug'
}
