import * as prism from '/util/prism'
import mainMenu from './mainMenu'
import game from './game'
import { Scene } from '/constant'
import app from '/app'

const sceneHandler = {
  [Scene.MAIN_MENU]: mainMenu,
  [Scene.GAME]: game,
}

const initializeSceneHandler = () => {
  prism.subscribe('scene', (value) => {
    sceneHandler[value]({ app })
  })
}

export default initializeSceneHandler
