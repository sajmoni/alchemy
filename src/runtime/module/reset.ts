import type { Sprite } from 'pixi.js'

// TODO: Add more here if this is useful

export function resetSprite(sprite: Sprite): void {
  sprite.scale.set(1)
  sprite.position.set(-9999, -9999)
  sprite.alpha = 1
}
