import type { Container } from 'pixi.js'

export default function intersects(object1: Container, object2: Container) {
  return object1.getBounds().intersects(object2.getBounds())
}
