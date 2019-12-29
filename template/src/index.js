import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import * as juice from 'juice.js'

import { GAME_HEIGHT, GAME_WIDTH } from './constant'
import Sound from './sound'

const VERSION = process.env.VERSION || 'N/A'
const DEBUG_PERFORMANCE = false
console.log(`Version: ${VERSION}`)

const app = new PIXI.Application({
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  // Can be enabled once a background image exists
  // clearBeforeRender: false,
  backgroundColor: 0x000077,
})

document
  .getElementById('game')
  .appendChild(app.view)

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

// statex.init(app, defaultState)

// TODO: Automatically read and load sprite sheets?
app.loader.add('spritesheet/spritesheet.json')

// Experimental API's are not supported by typescript
// @ts-ignore
document.fonts.load('10pt "patchy-robots"')
  .then(() => {
    app.loader.load(() => {
      const sprite = new PIXI.Sprite(ex.getTexture('square1'))
      sprite.x = 10
      sprite.y = 10
      app.stage.addChild(sprite)

      const text = new PIXI.Text('Game template initialized', { fontFamily: 'patchy-robots', fill: 'white', fontSize: 30 })
      text.anchor.set(0.5)
      text.x = GAME_WIDTH / 2
      text.y = GAME_HEIGHT / 2
      ex.makeResizable(text)
      app.stage.addChild(text)

      const getScale = juice.sine({
        duration: 180,
        startValue: 1,
        endValue: 1.2,
      })

      l1.repeat((counter) => {
        text.scale.set(getScale(counter))
      })

      Sound.SWORD_01.play()

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
