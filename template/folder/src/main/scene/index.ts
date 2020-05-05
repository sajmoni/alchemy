import * as PIXI from 'pixi.js'

import * as prism from '/util/prism'
import mainMenu from './mainMenu'
import game from './game'
import { Scene } from '/constant'
import app from '/app'

const sceneHandler = {
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
