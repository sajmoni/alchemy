import type { Container } from 'pixi.js'

export function boundsToString(container: Container): string {
  return `${container.label} => x: ${container.x}, y: ${container.y}, width: ${container.width}, height: ${container.height}`
}
