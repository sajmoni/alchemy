import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import { t } from '@lingui/macro'
import * as l1 from 'l1'
import MainLoop from 'mainloop.js'

import i18n from './i18n'
import app from './app'
import initializeGame from './main'
import state from './state'

import autoPause from './util/autoPause'
import { TextStyle, Render, Language } from './constant'
import { restore } from './util/storage'
import initializeGameLoop from './loop'
import initializeDebugTools from './debug'

const FONT = 'patchy-robots'
const DEFAULT_LANGUAGE = Language.EN.code

const VERSION = process.env.VERSION || 'N/A'
console.log(`Version: ${VERSION}`)
// const ERROR_LOGGING = process.env.ERROR_LOGGING || false

document.querySelector('#game').append(app.renderer.view)

const languageCode = restore('language') || DEFAULT_LANGUAGE
i18n.activate(languageCode)
state.application.language = languageCode

app.loader.add('spritesheet/spritesheet.json')

initializeGameLoop()
initializeDebugTools()

// Experimental API's are not supported by typescript
// @ts-ignore
document.fonts
  .load(`10pt "${FONT}"`)
  .then(() => {
    const loadingContainer = new PIXI.Container()
    loadingContainer.zIndex = 9999
    app.stage.addChild(loadingContainer)

    const loadingBackground = new PIXI.Graphics()
    loadingBackground
      .beginFill(ex.fromHex('#000000'))
      .drawRect(0, 0, Render.GAME_WIDTH, Render.GAME_HEIGHT)
      .endFill()
    loadingContainer.addChild(loadingBackground)

    const loading = new PIXI.Text(
      i18n._(t('main.loading')`Loading`),
      TextStyle.MAIN,
    )
    ex.centerX(loading, Render.GAME_WIDTH / 2)
    ex.centerY(loading, Render.GAME_HEIGHT / 2)
    loadingContainer.addChild(loading)

    app.loader.load(() => {
      ex.init(app)

      autoPause()

      initializeGame()

      l1.once(() => {
        loadingContainer.destroy()
      })

      // * Attempt to improve performance
      app.renderer.plugins.prepare.upload(app.stage, () => {
        MainLoop.start()
      })
    })
  })
  .catch((error) => {
    console.error('Error starting game:', error)
  })
