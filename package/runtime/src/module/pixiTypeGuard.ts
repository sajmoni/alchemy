import type { AnimatedSprite, Container } from 'pixi.js'

export function isAnimatedSprite(sprite: Container): sprite is AnimatedSprite {
  return (sprite as AnimatedSprite).textures !== undefined
}
