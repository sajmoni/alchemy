import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import MainLoop from 'mainloop.js'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { subscribeKey } from 'valtio/utils'
import { Howler } from 'howler'

import app from '~/app'
import state from '~/state'
import useAutoPause from '~/util/useAutoPause'
import { TextStyle, Render, Language, Key } from '~/enum'
import * as ls from '~/util/storage'
import env from './env'

import initializeGameLoop from './core/loop'
import initializeDebugTools from './core/debug'
import initializeObjectPool from '~/util/objectPool'
import initializeSceneHandler from './core/sceneHandler'
import initializeWorker from './core/worker'
import initializeKeyboardInput from './input/keyboard'
import handleError from './util/handleError'

Sentry.init({
  dsn: '',
  integrations: [new Integrations.BrowserTracing()],
  environment: env.NODE_ENV,
  autoSessionTracking: true,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,
})

const FONT = 'Press Start 2P'
const DEFAULT_LANGUAGE = Language.EN.code

console.log(`Version: ${env.VERSION}`)
// const ERROR_LOGGING = process.env.ERROR_LOGGING || false

const GAME_SELECTOR = '#game'

const gameElement = document.querySelector(GAME_SELECTOR)

if (!gameElement) {
  throw new Error(`Element with id ${GAME_SELECTOR} was not found in the DOM`)
}

gameElement.append(app.renderer.view)

const languageCode = (ls.get('language') as string) || DEFAULT_LANGUAGE
state.application.language = languageCode

app.loader.add('/asset/spritesheet/data.json')

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
      try {
        ex.init(app)

        useAutoPause()

        initializeDebugTools()
        initializeObjectPool()
        initializeSceneHandler()
        initializeWorker()
        initializeKeyboardInput(Object.values(Key))

        subscribeKey(state.application.volume, 'sound', (volume) => {
          Howler.volume(volume * 0.1)
        })

        l1.once(() => {
          loadingContainer.destroy()
        })

        // * Attempt to improve performance
        app.renderer.plugins.prepare.upload(app.stage, () => {
          MainLoop.start()
        })
      } catch (error: unknown) {
        handleError('Error on init', error)
      }
    })
  })
  .catch((error: Error) => {
    handleError('Error loading font', error)
  })
