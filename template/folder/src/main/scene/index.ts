import * as PIXI from 'pixi.js'
import * as prism from 'state-prism'

/* PLOP_INJECT_IMPORT */
import mainMenu from './mainMenu'
import game from './game'
import { Scene } from '/constant'
import app from '/app'

const sceneHandler = {
  /* PLOP_INJECT_SCENE */
  [Scene.MAIN_MENU]: mainMenu,
  [Scene.GAME]: game,
}

let container

const initializeSceneHandler = () => {
  prism.subscribe('scene', (value) => {
    if (container) {
      container.destroy()
    }

    container = new PIXI.Container()
    app.stage.addChild(container)

    sceneHandler[value]({ container })
  })
}

export default initializeSceneHandler
