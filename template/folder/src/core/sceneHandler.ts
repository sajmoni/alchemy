import * as PIXI from 'pixi.js'
import { subscribeKey } from 'valtio/utils'

/* PLOP_INJECT_IMPORT */
import mainMenu from '/scene/mainMenu'
import game from '/scene/game'

import { Scene } from '/enum'
import app from '/app'
import { SceneArgs } from '/type'
import state from '/state'
import env from '/env'
import handleError from '/util/handleError'

const sceneHandler: Record<Scene, (sceneArgs: SceneArgs) => void> = {
  /* PLOP_INJECT_SCENE */
  [Scene.MAIN_MENU]: mainMenu,
  [Scene.GAME]: game,
}

let container: PIXI.Container

const initializeSceneHandler = (): void => {
  const loadScene = (scene: Scene): void => {
    if (container) {
      container.destroy()
    }

    container = new PIXI.Container()
    app.stage.addChild(container)

    sceneHandler[scene]({
      container,
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

export default initializeSceneHandler
