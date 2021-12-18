import { setPosition } from 'pixi-ex'
import { Container } from 'pixi.js'
import { subscribe } from 'valtio'

import { Position } from '~/type'

const syncPosition = (object: Container, position: Position) => {
  setPosition(object, position)
  subscribe(position, () => {
    setPosition(object, position)
  })
}

export default syncPosition
