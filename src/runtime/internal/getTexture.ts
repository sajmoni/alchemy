import type { Texture } from 'pixi.js'

import type { Textures } from '../type'

export function createGetTexture<TextureName extends string>(
  textures: Textures<TextureName>,
) {
  return function getTexture(textureName: TextureName): Texture {
    return textures[textureName]
  }
}
