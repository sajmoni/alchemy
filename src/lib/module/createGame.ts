import {
  type Application,
  settings,
  SCALE_MODES,
  BaseTexture,
  Assets,
} from 'pixi.js'
import { proxy } from 'valtio'

import initializeDOM from '../internal/dom'
import initializeTicker from '../internal/ticker'
import createTimer from '../internal/timer'
import type { AlchemyState, BaseScene, Sounds } from '../type'
import { initializeSound } from '../internal/sound'
import initializeDebugConsole from '../internal/debugConsole'
import initializeDebugOverlay from '../internal/debugOverlay'
import showLoadingScreen from '../internal/loading'
import useAutoPause from '../internal/useAutoPause'
import createSetScene from '../setScene'
import ParkMiller from 'park-miller'
import { getRandomInt } from 'tiny-toolkit'

export default async function createGame<
  Keys extends readonly string[],
  TextureName extends string,
  State extends object,
  SceneKey extends string,
  SoundName extends string,
  MusicName extends string,
>({
  /**
   * Keyboard keys that the game uses
   */
  keys,
  scenes,
  spriteSheetPath,
  font,
  app,
  state,
  sounds,
  scene,
  randomSeed,
  config = {},
}: {
  keys: Keys
  scenes: Record<
    SceneKey,
    (
      args: BaseScene<Keys, TextureName, State, SceneKey, SoundName, MusicName>,
    ) => void
  >
  spriteSheetPath: string
  font: string
  app: Application
  state: State
  sounds: Sounds
  scene: SceneKey
  randomSeed?: number
  config?: {
    pixelPerfect?: boolean
    autoPause?: boolean
  }
}) {
  if (config.pixelPerfect) {
    // antialias: true has to be set on application
    BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST
  }

  showLoadingScreen()

  Assets.add('spritesheet', spriteSheetPath)
  const [{ textures }] = await Promise.all([
    Assets.load('spritesheet'),
    document.fonts.load(font),
  ])

  settings.ROUND_PIXELS = true

  const alchemyState: AlchemyState<SceneKey> = {
    paused: false,
    scene,
    timer: undefined,
    error: undefined,
    time: 0,
  }
  const proxyState = proxy({ ...state, alchemy: alchemyState })

  if (config.autoPause) {
    useAutoPause(proxyState)
  }

  initializeDOM({ app })
  const global = {
    timer: createTimer(),
  }

  const ticker = initializeTicker(proxyState, global)

  initializeDebugConsole(proxyState, app)

  const { sound } = initializeSound<SoundName, MusicName>(sounds)

  const random = new ParkMiller(randomSeed ?? getRandomInt())

  const setScene = createSetScene({
    state: proxyState,
    app,
    keys,
    ticker,
    sound,
    textures,
    scenes,
    global,
    random,
  })

  if (import.meta.env.MODE === 'development') {
    const sceneKeys = Object.keys(scenes) as SceneKey[]
    initializeDebugOverlay({
      sceneKeys,
      state: proxyState,
      app,
      ticker,
      setScene,
      scene,
    })
  } else {
    setScene(scene)
  }
}
