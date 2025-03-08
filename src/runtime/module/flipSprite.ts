import type { Sprite } from 'pixi.js'

export function flipSprite(sprite: Sprite) {
  sprite.scale.x *= -1
}
