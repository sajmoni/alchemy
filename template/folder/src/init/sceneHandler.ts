import * as PIXI from 'pixi.js'
import * as prism from 'state-prism'

/* PLOP_INJECT_IMPORT */
import mainMenu from '../game/scene/mainMenu'
import game from '../game/scene/game'
import { Scene } from '../constant'
import app from '../app'
import { SceneArgs } from '../type/scene'
import state from '../state'

const sceneHandler: Record<Scene, (sceneArgs: SceneArgs) => void> = {
  /* PLOP_INJECT_SCENE */
  [Scene.MAIN_MENU]: mainMenu,
  [Scene.GAME]: game,
}

let container: PIXI.Container

const initializeSceneHandler = () => {
  const loadScene = (scene: Scene) => {
    if (container) {
      container.destroy()
    }

    container = new PIXI.Container()
    app.stage.addChild(container)

    sceneHandler[scene]({
      container,
    })
  }

  prism.subscribe('scene', loadScene)
  loadScene(state.scene)
}

export default initializeSceneHandler
