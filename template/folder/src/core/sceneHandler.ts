import { Container } from 'pixi.js'
import { subscribeKey } from 'valtio/utils'
import {
  OnceCallback,
  BehaviorOptions,
  once,
  cancel,
  getByLabel,
  ForeverCallback,
  forever,
  every,
  EveryCallback,
  delay,
} from 'l1'

/* PLOP_INJECT_IMPORT */
import mainMenu from '~/scene/mainMenu'
import game from '~/scene/game'

import { Scene } from '~/enum/app'
import app from '~/app'
import { SceneArgs, TextureMap, Run } from '~/type/app'
import state from '~/state'
import handleError from '~/util/handleError'

const sceneHandler: Record<Scene, (sceneArgs: SceneArgs) => void> = {
  /* PLOP_INJECT_SCENE */
  [Scene.MAIN_MENU]: mainMenu,
  [Scene.GAME]: game,
}

let container: Container
let previousScene: string | undefined

const initializeSceneHandler = (textures: TextureMap): void => {
  const loadScene = (scene: Scene): void => {
    if (container) {
      container.destroy()
    }

    if (previousScene) {
      for (const behavior of getByLabel(previousScene)) {
        cancel(behavior)
      }
    }

    // Ensure that previous behaviors are removed
    once(() => {
      container = new Container()
      app.stage.addChild(container)

      const run: Run = {
        once: (
          callback: OnceCallback,
          delay: number,
          options: BehaviorOptions = {},
        ) => {
          return once(callback, delay, {
            ...options,
            labels: options.labels ? [...options.labels, scene] : [scene],
          })
        },
        forever: (
          callback: ForeverCallback,
          interval: number,
          options: BehaviorOptions = {},
        ) => {
          return forever(callback, interval, {
            ...options,
            labels: options.labels ? [...options.labels, scene] : [scene],
          })
        },
        every: (
          callback: EveryCallback,
          duration: number,
          options: BehaviorOptions = {},
        ) => {
          return every(callback, duration, {
            ...options,
            labels: options.labels ? [...options.labels, scene] : [scene],
          })
        },
        delay: async (_delay: number, options: BehaviorOptions = {}) => {
          return delay(_delay, {
            ...options,
            labels: options.labels ? [...options.labels, scene] : [scene],
          })
        },
      }

      previousScene = scene
      sceneHandler[scene]({
        container,
        textures,
        run,
      })
    }, 1)
  }

  subscribeKey(state, 'scene', (scene: Scene) => {
    try {
      loadScene(scene)
    } catch (error: unknown) {
      handleError('Error loading scene', error)
    }
  })
  loadScene(state.scene)
}

export default initializeSceneHandler
