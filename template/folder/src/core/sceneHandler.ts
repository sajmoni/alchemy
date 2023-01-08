import { Container } from 'pixi.js'
import { subscribeKey } from 'valtio/utils'
import { Instance, BehaviorOptions } from 'l1'

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

export default function initializeSceneHandler(
  l1: Instance,
  textures: TextureMap,
): void {
  let container: Container
  let previousScene: string | undefined

  const loadScene = async (scene: Scene): Promise<void> => {
    if (container) {
      container.destroy()
    }

    if (previousScene) {
      for (const behavior of l1.getByLabel(previousScene)) {
        console.log(
          'file: sceneHandler.ts ~ line 35 ~ loadScene ~ behavior',
          behavior,
        )
        l1.cancel(behavior)
      }
    }

    // Ensure that previous behaviors are removed
    await l1.delay(1)
    console.log('hello', l1.getAll())

    container = new Container()
    app.stage.addChild(container)

    const run: Run = {
      forever: (
        callback: any,
        interval: number,
        options: BehaviorOptions = {},
      ) => {
        return l1.forever(callback, interval, {
          ...options,
          labels: options.labels ? [...options.labels, scene] : [scene],
        })
      },
      every: (
        callback: any,
        duration: number,
        options: BehaviorOptions = {},
      ) => {
        return l1.every(callback, duration, {
          ...options,
          labels: options.labels ? [...options.labels, scene] : [scene],
        })
      },
      delay: async (_delay: number, options: BehaviorOptions = {}) => {
        return l1.delay(_delay, {
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
