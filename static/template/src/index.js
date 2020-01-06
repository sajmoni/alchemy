import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import * as prism from './util/prism'
import app from './app'
import game from './game'
import state from './state'

const VERSION = process.env.VERSION || 'N/A'
const DEBUG_PERFORMANCE = false
console.log(`Version: ${VERSION}`)

document
  .getElementById('game')
  .appendChild(app.renderer.view)

ex.init(app)

const loopDurations = []

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
  // Add console commands here
}
