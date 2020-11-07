import * as PIXI from 'pixi.js'
import * as prism from 'state-prism'

/* PLOP_INJECT_IMPORT */
import mainMenu from './mainMenu'
import game from './game'
import { Scene } from '../../constant'
import app from '../../app'
import { SceneArgs } from '../../type/scene'

const sceneHandler: Record<Scene, ((sceneArgs: SceneArgs) => void)> = {
  /* PLOP_INJECT_SCENE */
  [Scene.MAIN_MENU]: mainMenu,
  [Scene.GAME]: game,
}

let container: PIXI.Container
const unsubscribeFunctions: (() => void)[] = []

const initializeSceneHandler = () => {
  const subscribe = (path: string, callback: (value: any, previousValue: any) => void) => {
    unsubscribeFunctions.push(prism.subscribe(path, callback))
  }

  prism.subscribe('scene', (value: Scene) => {
    if (container) {
      container.destroy()
    }

    unsubscribeFunctions.forEach((unsubscribe) => {
      unsubscribe()
    })

    container = new PIXI.Container()
    app.stage.addChild(container)

    sceneHandler[value]({ container, subscribe })
  })
}

export default initializeSceneHandler
