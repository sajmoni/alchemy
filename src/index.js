import * as PIXI from 'pixi.js'
import * as l1 from 'l1'
import { GAME_HEIGHT, GAME_WIDTH } from './constant'

const VERSION = process.env.VERSION || 'N/A'

const { error, log } = console

log(`Version: ${VERSION}`)

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

l1.init(app, {
  debug: false,
  logging: false,
})

app.loader.add('spritesheet/spritesheet.json')

// Experimental API's are not supported by typescript
// @ts-ignore
document.fonts.load('10pt "patchy-robots"')
  .then(() => {
    app.loader.load(() => {
      const sprite = new PIXI.Sprite(l1.getTexture('square1'))
      sprite.x = 10
      sprite.y = 10
      app.stage.addChild(sprite)

      const text = new PIXI.Text('Game template initialized', { fontFamily: 'patchy-robots', fill: 'white' })
      text.anchor.set(0.5)
      text.x = GAME_WIDTH / 2
      text.y = GAME_HEIGHT / 2
      app.stage.addChild(text)
    })
  })
  .catch(() => {
    error('Unable to load font')
  })

window.debug = {
  ...window.debug,
  // Add console commands here
}
