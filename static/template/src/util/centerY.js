import { GAME_HEIGHT } from '../constant'

export default (displayObject) => {
  // eslint-disable-next-line no-param-reassign
  displayObject.position.y = GAME_HEIGHT / 2
  // eslint-disable-next-line no-param-reassign
  displayObject.anchor.y = 0.5
}
