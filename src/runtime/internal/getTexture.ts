import type { Texture } from 'pixi.js'

import type { Textures } from '../type.js'

export function createGetTexture<TextureName extends string>(
  textures: Textures<TextureName>,
) {
  return function getTexture(textureName: TextureName): Texture {
    return textures[textureName]
  }
}
