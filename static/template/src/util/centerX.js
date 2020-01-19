import { GAME_WIDTH } from '../constant'

export default (displayObject) => {
  // eslint-disable-next-line no-param-reassign
  displayObject.position.x = GAME_WIDTH / 2
  // eslint-disable-next-line no-param-reassign
  displayObject.anchor.x = 0.5
}
