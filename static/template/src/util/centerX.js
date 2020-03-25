import { Render } from '../constant'

// TODO: Make this centerX inside a container
// TODO: Check if this is a container and set pivot?
// TODO: Add to pixi-ex
export default (displayObject) => {
  displayObject.position.x = Render.GAME_WIDTH / 2
  displayObject.anchor.x = 0.5
}
