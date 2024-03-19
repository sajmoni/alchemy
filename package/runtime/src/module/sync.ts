import type { Container } from 'pixi.js'
import { subscribe } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import type { Position } from '../type'

/**
 * Sync a state value to a pixi object property
 */
export function sync<State extends object, PixiObject extends Container>(
  pixiObject: PixiObject,
  pixiObjectProperty: keyof PixiObject,
  state: State,
  stateProperty: keyof State,
) {
  // @ts-expect-error Figure this out
  pixiObject[pixiObjectProperty] = state[stateProperty]
  subscribeKey(state, stateProperty, (value) => {
    // @ts-expect-error Figure this out
    pixiObject[pixiObjectProperty] = value
  })
}

export function syncPosition(position: Position, object: Container) {
  object.position.set(position.x, position.y)
  subscribe(position, () => {
    object.position.set(position.x, position.y)
  })
}
