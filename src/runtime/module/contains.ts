import type { Container } from 'pixi.js'

import type { Position } from '../type.js'

export function contains(object: Container, point: Position): boolean {
  return object.getBounds().containsPoint(point.x, point.y)
}
