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
import { Key, Render } from '~/enum'
import env from './env'

import initializeGameLoop from './core/loop'
import initializeDebugOverlay from './core/debugOverlay'
import initializeSceneHandler from './core/sceneHandler'
import initializeWorker from './core/worker'
import initializeKeyboardInput from './input/keyboard'
import handleError from './util/handleError'
import createFullscreenLoading from './view/fullscreenLoading'
import { language } from './ls'
import initializeDebugConsole from './core/debugConsole'

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

// const ERROR_LOGGING = process.env.ERROR_LOGGING || false

const GAME_SELECTOR = '#game'

const gameElement: HTMLElement | null = document.querySelector(GAME_SELECTOR)

if (!gameElement) {
  throw new Error(`Element with id ${GAME_SELECTOR} was not found in the DOM`)
}

gameElement.append(app.renderer.view)
gameElement.style.width = `${Render.GAME_WIDTH * 2}px`
gameElement.style.height = `${Render.GAME_HEIGHT * 2}px`

state.application.language = language.get()

app.loader.add('/asset/spritesheet/data.json')

initializeGameLoop()

document.fonts
  .load(`10pt "${FONT}"`)
  .then(() => {
    const fullscreenLoading = createFullscreenLoading()
    app.stage.addChild(fullscreenLoading)

    // Only show loading screen if loading is slow
    l1.once(() => {
      fullscreenLoading.visible = true
    }, 15)

    app.loader.load(() => {
      try {
        ex.init(app)

        useAutoPause()

        initializeDebugOverlay()
        initializeDebugConsole()
        initializeSceneHandler()
        initializeWorker()
        initializeKeyboardInput(Object.values(Key))

        subscribeKey(state.application.volume, 'sound', (volume) => {
          // @ts-expect-error Incorrectly marked as error
          Howler.volume(volume * 0.1)
        })

        l1.once(() => {
          fullscreenLoading.destroy()
        }, 1)

        MainLoop.start()
      } catch (error: unknown) {
        handleError('Error on init', error)
      }
    })
  })
  .catch((error: Error) => {
    handleError('Error loading font', error)
  })
