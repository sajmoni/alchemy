import type { Container } from 'pixi.js'

/**
 * Set pivot point in the middle of a container
 *
 * @param container
 * @param width
 * @param height
 *
 * @example centerPivot(container, app.screen.width, app.screen.height)
 */
export function centerPivot(
  container: Container,
  width: number,
  height: number,
) {
  container.pivot.set(width / 2, height / 2)
  container.position.set(width / 2, height / 2)
}
