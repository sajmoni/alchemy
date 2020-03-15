import { Render } from '../constant'

export default (displayObject) => {
  displayObject.position.x = Render.GAME_WIDTH / 2
  displayObject.anchor.x = 0.5
}
