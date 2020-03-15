import { Render } from '../constant'

export default (displayObject) => {
  displayObject.position.y = Render.GAME_HEIGHT / 2
  displayObject.anchor.y = 0.5
}
