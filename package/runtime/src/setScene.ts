import { Application, Container, Texture, Ticker } from 'pixi.js'
import { subscribeKey } from 'valtio/utils'
import { subscribe, proxy } from 'valtio'

import handleError from './internal/handleError'
import initializeKeyboardInput from './internal/input'
import createTimer, { type TimerInstance } from './internal/timer'
import type { AlchemyState, BaseScene, Input, Music, Sound } from './type'
import makeGetAverageDuration from './internal/makeGetAverageDuration'
import createUtil from './internal/util'
import animate from './internal/animate'
import createUseScreenShake from './internal/useScreenShake'
import { createGetTextures } from './internal/getTextures'
import type ExtendedParkMiller from './internal/random'

const updateDurations: number[] = []

export default function createSetScene<
  const Keys extends readonly string[],
  const TextureName extends string,
  const State extends object,
  const SceneKey extends string,
  const SoundName extends string,
  const MusicName extends string,
>({
  state,
  app,
  keys,
  ticker,
  sound,
  scenes,
  textures,
  global,
  random,
}: {
  state: State & {
    alchemy: AlchemyState<SceneKey>
  }
  app: Application
  keys: Keys
  ticker: Ticker
  sound: {
    sound: Sound<SoundName>
    music: Music<MusicName>
  }
  scenes: Record<
    SceneKey,
    (
      args: BaseScene<Keys, TextureName, State, SceneKey, SoundName, MusicName>,
    ) => void
  >
  textures: Record<TextureName, Texture>
  global: {
    timer: TimerInstance
  }
  random: ExtendedParkMiller
}) {
  let container: Container | undefined

  let input: Input<Keys> | undefined

  let tickerSceneFn: (ticker: Ticker) => void | undefined

  async function setScene(sceneKey: SceneKey): Promise<void> {
    state.alchemy.scene = sceneKey

    // Destroy previous scene
    if (container) {
      container.destroy({ children: true })
      app.stage.removeChild(container)
    }
    container = new Container()
    container.label = `${sceneKey}-container`

    app.stage.addChild(container)

    if (state.alchemy.timer) {
      state.alchemy.timer.destroy()
    }
    const timer = createTimer()
    state.alchemy.timer = timer

    if (tickerSceneFn) {
      ticker.remove(tickerSceneFn)
    }
    if (import.meta.env.MODE === 'production') {
      tickerSceneFn = (ticker) => {
        if (state.alchemy.timer && !state.alchemy.paused) {
          try {
            state.alchemy.timer.update(ticker.deltaTime)
          } catch (error) {
            handleError(state.alchemy, 'Error in scene timer', error)
          }
        }
      }
    } else {
      tickerSceneFn = (ticker) => {
        if (state.alchemy.timer && !state.alchemy.paused) {
          try {
            const beforeUpdate = performance.now()
            state.alchemy.timer.update(ticker.deltaTime)
            const afterUpdate = performance.now()
            const loopDuration = afterUpdate - beforeUpdate
            updateDurations.push(loopDuration)
          } catch (error) {
            handleError(state.alchemy, 'Error in scene timer', error)
          }
        }
      }
    }
    ticker.add(tickerSceneFn)

    if (input) {
      input.unsubscribe()
    }
    input = initializeKeyboardInput(keys, state.alchemy.timer)

    const scene = scenes[sceneKey]
    if (scene) {
      try {
        scene({
          input,
          textures,
          container,
          state: state,
          subscribeKey,
          subscribe,
          proxy,
          timer: {
            delay: timer.delay,
            repeatUntil: timer.repeatUntil,
            repeatEvery: timer.repeatEvery,
          },
          global: {
            timer: {
              delay: global.timer.delay,
              repeatUntil: global.timer.repeatUntil,
              repeatEvery: global.timer.repeatEvery,
            },
          },
          setScene,
          sound: sound.sound,
          music: sound.music,
          app,
          util: createUtil(app),
          animate: animate(timer),
          useScreenShake: createUseScreenShake(timer),
          getTextures: createGetTextures(textures),
          random,
        })
      } catch (error) {
        handleError(state.alchemy, 'Error in scene', error)
      }
    } else {
      throw new Error(`Incorrect scene key: "${sceneKey}"`)
    }
  }

  return setScene
}

export const getAverageSceneUpdateDuration =
  makeGetAverageDuration(updateDurations)
