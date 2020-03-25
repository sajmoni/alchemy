import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import { t } from '@lingui/macro'
import MainLoop from 'mainloop.js'

import i18n from './i18n'
import * as prism from './util/prism'
import app from './app'
import game from './game'
import state from './state'
import debugOverlay from './util/debugOverlay'
import autoFullScreen from './util/autoFullScreen'
import autoPause from './util/autoPause'
import centerY from './util/centerY'
import centerX from './util/centerX'
import { TextStyle, Render, Language } from './constant'
import Sound from './sound'
import { restore } from './util/storage'

const FONT = 'patchy-robots'
const DEFAULT_LANGUAGE = Language.EN.code

const VERSION = process.env.VERSION || 'N/A'
console.log(`Version: ${VERSION}`)

const DEBUG = true

document
  .getElementById('game')
  .appendChild(app.renderer.view)


let loopDurations = []

if (DEBUG) {
  MainLoop.setUpdate((deltaTime) => {
    const beforeUpdate = performance.now()
  
    // 16.6 -> 1
    l1.update(deltaTime / (1000 / 60))
  
    const afterUpdate = performance.now()
    const loopDuration = afterUpdate - beforeUpdate
    loopDurations.push(loopDuration)
  })
} else {
  MainLoop.setUpdate((deltaTime) => {
    // 16.6 -> 1
    l1.update(deltaTime / (1000 / 60))
  })
}

MainLoop.setDraw(() => {
  app.renderer.render(app.stage)
})

const languageCode = restore('language') || DEFAULT_LANGUAGE
i18n.activate(languageCode)
state.application.language = languageCode

app.loader.add('spritesheet/spritesheet.json')

// Experimental API's are not supported by typescript
// @ts-ignore
document.fonts.load(`10pt "${FONT}"`)
  .then(() => {
    const loadingContainer = new PIXI.Container()
    loadingContainer.zIndex = 9999
    app.stage.addChild(loadingContainer)

    const loadingBackground = new PIXI.Graphics()
    loadingBackground
      .beginFill(ex.fromHex('#000000'))
      .drawRect(0, 0, Render.GAME_WIDTH, Render.GAME_HEIGHT)
      // .endFill()
    loadingContainer.addChild(loadingBackground)

    const loading = new PIXI.Text(i18n._(t('main.loading')`Loading`), TextStyle.MAIN)
    centerY(loading)
    centerX(loading)
    loadingContainer.addChild(loading)

    app.loader.load(() => {
      ex.init(app)

      // * Enable this to make your game be always full screen.
      // autoFullScreen()

      autoPause()

      game()

      l1.once(() => {
        loadingContainer.destroy()
      })

      // * Attempt to improve performance
      app.renderer.plugins.prepare.upload(app.stage, () => {
        MainLoop.start()
      })

      prism.subscribe(['application.paused'], ({ application: { paused }}) => {
        if (paused) {
          // TODO: This should probably just stop the l1.repeat main behavior
          // * Because we might want to have an animation when paused
          MainLoop.stop()
        } else {
          MainLoop.start()
        }
      })
    })
  })
  .catch(() => {
    console.error('Unable to load font')
  })

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
