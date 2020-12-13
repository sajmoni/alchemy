import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import MainLoop from 'mainloop.js'

import app from './app'
import initializeGame from './main'
import state from './state'

import useAutoPause from './util/useAutoPause'
import { TextStyle, Render, Language, Scene } from './constant'
import * as ls from './util/storage'
import initializeGameLoop from './loop'
import initializeDebugTools from './debug'
import initializeObjectPool from './util/objectPool'
import initializeSceneHandler from './main/scene'

const FONT = 'patchy-robots'
const DEFAULT_LANGUAGE = Language.EN.code

const VERSION = process.env.VERSION ?? 'N/A'
console.log(`Version: ${VERSION}`)
// const ERROR_LOGGING = process.env.ERROR_LOGGING || false

const GAME_SELECTOR = '#game'

const gameElement = document.querySelector(GAME_SELECTOR)

if (!gameElement) {
  throw new Error(`Element with id ${GAME_SELECTOR} was not found in the DOM`)
}

gameElement.append(app.renderer.view)

const languageCode = ls.get('language') || DEFAULT_LANGUAGE
state.application.language = languageCode

app.loader.add('asset/spritesheet/spritesheet.json')

initializeGameLoop()

// Experimental API's are not supported by typescript
// @ts-expect-error
document.fonts
  .load(`10pt "${FONT}"`)
  .then(() => {
    const loadingContainer = new PIXI.Container()
    loadingContainer.zIndex = 9999
    app.stage.addChild(loadingContainer)

    const loadingBackground = new PIXI.Graphics()
    loadingBackground
      .beginFill(PIXI.utils.string2hex('#000000'))
      .drawRect(0, 0, Render.GAME_WIDTH, Render.GAME_HEIGHT)
      .endFill()
    loadingContainer.addChild(loadingBackground)

    const loading = new PIXI.Text(`Loading`, new PIXI.TextStyle(TextStyle.MAIN))
    ex.centerX(loading, Render.GAME_WIDTH / 2)
    ex.centerY(loading, Render.GAME_HEIGHT / 2)
    loadingContainer.addChild(loading)

    app.loader.load(() => {
      ex.init(app)

      useAutoPause()

      initializeDebugTools()
      initializeObjectPool()
      initializeSceneHandler()
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
  .catch((error: Error) => {
    console.error('Error starting game:', error)
  })
