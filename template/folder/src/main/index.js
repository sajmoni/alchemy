import initializeSceneHandler from './scene'
import state from '/state'
import { Scene } from '/constant'

const initializeGame = () => {
  initializeSceneHandler()
  state.scene = Scene.MAIN_MENU
}

export default initializeGame
