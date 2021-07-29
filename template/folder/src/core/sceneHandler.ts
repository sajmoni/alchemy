import * as PIXI from 'pixi.js'
import * as prism from 'state-prism'
import dotProp from 'dot-prop'

/* PLOP_INJECT_IMPORT */
import mainMenu from '/scene/mainMenu'
import game from '/scene/game'
import { Scene } from '/enum'
import app from '/app'
import { RenderScene, SceneArgs } from '/type/scene'
import state from '/state'
import env from '/env'
import handleError from '/util/handleError'

const sceneHandler: Record<Scene, (sceneArgs: SceneArgs) => RenderScene> = {
  /* PLOP_INJECT_SCENE */
  [Scene.MAIN_MENU]: mainMenu,
  [Scene.GAME]: game,
}

let container: PIXI.Container
let unsubscribeFunctions: prism.unsubscribe[] = []

const initializeSceneHandler = (): void => {
  const loadScene = (scene: Scene): void => {
    if (container) {
      container.destroy()
    }

    for (const unsubscribe of unsubscribeFunctions) {
      unsubscribe()
    }

    unsubscribeFunctions = []

    container = new PIXI.Container()
    app.stage.addChild(container)

    const render = sceneHandler[scene]({
      container,
    })

    for (const [path, subscribe] of Object.entries(render)) {
      if (env.NODE_ENV === 'development' && !dotProp.has(state, path)) {
        console.error(
          `SceneHandler: Path "${path}" was returned from scene "${scene}" but does not exist in state`,
        )
      }

      const unsubscribe = prism.subscribe(path, subscribe)
      unsubscribeFunctions.push(unsubscribe)
    }
  }

  prism.subscribe('scene', (scene: Scene) => {
    try {
      loadScene(scene)
    } catch (error: unknown) {
      handleError('Error loading scene', error)
    }
  })
  loadScene(state.scene)
}

export default initializeSceneHandler
