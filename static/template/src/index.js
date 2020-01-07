import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import * as prism from './util/prism'
import app from './app'
import game from './game'
import state from './state'
import debugOverlay from './util/debugOverlay'

const VERSION = process.env.VERSION || 'N/A'
const DEBUG_PERFORMANCE = false
console.log(`Version: ${VERSION}`)

document
  .getElementById('game')
  .appendChild(app.renderer.view)

ex.init(app)

const loopDurations = []

let loopDurations = []

if (DEBUG_PERFORMANCE) {
  app.ticker.add((deltaTime) => {
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

// Make game fullscreen and resize when window is resized
const resizeGame = () => {
  // const game = document.getElementById('container')
  // game.style.height = `${window.innerHeight}px`

  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  ex.resize(screenWidth, screenHeight)
}
resizeGame()

window.addEventListener('resize', resizeGame)

window['debug'] = {
  ...window['debug'],
  state: () => prism.getState(),
  // * Add console commands here
}

if (process.env.NODE_ENV === 'development' && DEBUG_PERFORMANCE) {
  // const spector = new SPECTOR.Spector()
  const debugItems = {
    ups: () => Math.floor(app.ticker.FPS),
    // fps: () => Math.floor(spector.getFps()),
    behaviors: () => l1.getAll().length,
    'display objects': () => ex.getAllChildren(app.stage).length,
    'loop duration': () => {
      const averageLoopDuration = loopDurations
        .reduce((acc, ts) => acc + ts, 0)
      / (loopDurations.length || 1)

      loopDurations = []

      return averageLoopDuration.toFixed(3)
    },
    // TODO: Enable this in the future
    // 'draw calls': () => drawCalls,
  }

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
