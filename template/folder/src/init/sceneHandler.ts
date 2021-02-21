import * as PIXI from 'pixi.js'
import * as prism from 'state-prism'

/* PLOP_INJECT_IMPORT */
import mainMenu from '/scene/mainMenu'
import game from '/scene/game'
import { Scene } from '/enum'
import app from '/app'
import { RenderScene, SceneArgs } from '/type/scene'
import state from '/state'

const sceneHandler: Record<
  Scene,
  (sceneArgs: SceneArgs) => RenderScene | void
> = {
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

    unsubscribeFunctions.forEach((unsubscribe) => {
      unsubscribe()
    })
    unsubscribeFunctions = []

    container = new PIXI.Container()
    app.stage.addChild(container)

    const render = sceneHandler[scene]({
      container,
    })

    if (render) {
      Object.entries(render).forEach(([path, subscribe]) => {
        const unsubscribe = prism.subscribe(path, subscribe)
        unsubscribeFunctions.push(unsubscribe)
      })
    }
  }

  prism.subscribe('scene', loadScene)
  loadScene(state.scene)
}

export default initializeSceneHandler
