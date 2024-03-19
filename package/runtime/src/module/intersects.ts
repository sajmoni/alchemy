import type { Container } from 'pixi.js'

export function intersects(object1: Container, object2: Container) {
  // @ts-expect-error - Unclear how to replace this
  return object1.getBounds().intersects(object2.getBounds())
}
