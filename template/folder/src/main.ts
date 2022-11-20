import * as l1 from 'l1'
import MainLoop from 'mainloop.js'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { subscribeKey } from 'valtio/utils'
import { Assets } from 'pixi.js'

import app from '~/app'
import state from '~/state'
import useAutoPause from '~/util/useAutoPause'
import { Key, Render } from '~/enum/app'

import env from './env'
import initializeGameLoop from './core/loop'
import initializeSceneHandler from './core/sceneHandler'
import initializeWorker from './core/worker'
import initializeKeyboardInput from './input/keyboard'
import handleError from './util/handleError'
import createFullscreenLoading from './view/fullscreenLoading'
import { language, musicVolume, soundVolume } from './ls'
import initializeDebugConsole from './core/debugConsole'
import { setMusicVolume, setSoundVolume } from './sound'

async function init() {
  const fullscreenLoading = createFullscreenLoading()
  app.stage.addChild(fullscreenLoading)

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

  // const ERROR_LOGGING = process.env.ERROR_LOGGING || false

  const gameSelector = '#game'
  const gameElement: HTMLElement | null = document.querySelector(gameSelector)
  if (!gameElement) {
    throw new Error(`Element with id ${gameSelector} was not found in the DOM`)
  }
  gameElement.append(app.renderer.view as HTMLCanvasElement)
  gameElement.style.width = `${Render.GAME_WIDTH * Render.RESOLUTION}px`
  gameElement.style.height = `${Render.GAME_HEIGHT * Render.RESOLUTION}px`

  Assets.add('spritesheet', './asset/spritesheet/data.json')
  initializeGameLoop()
  // Only show loading screen if loading is slow
  l1.once(() => {
    fullscreenLoading.visible = true
  }, 60)

  try {
    const [{ textures }] = await Promise.all([
      Assets.load('spritesheet'),
      document.fonts.load(`10pt "Press Start 2P"`),
    ])

    useAutoPause()

    if (env.NODE_ENV === 'development' && env.DEBUG) {
      import('~/core/debugOverlay').then((debugOverlay) => {
        debugOverlay.default()
      })
    }
    initializeDebugConsole()
    initializeSceneHandler(textures)
    initializeWorker()
    initializeKeyboardInput(Object.values(Key))

    subscribeKey(state.application.volume, 'sound', (volume) => {
      soundVolume.set(volume)
      setSoundVolume(volume)
    })
    subscribeKey(state.application.volume, 'music', (volume) => {
      musicVolume.set(volume)
      setMusicVolume(volume)
    })

    state.application.language = language.get()
    state.application.volume.sound = soundVolume.get()
    state.application.volume.music = musicVolume.get()

    l1.once(() => {
      fullscreenLoading.destroy()
    }, 1)

    MainLoop.start()
  } catch (error) {
    handleError('Error on init', error)
  }
}

init()
