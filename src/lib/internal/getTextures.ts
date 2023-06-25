import type { Texture } from 'pixi.js'
import type { Textures } from '../type'

export function createGetTextures<TextureName extends string>(
  textures: Textures<TextureName>,
) {
  return function getTextures(textureNames: Array<TextureName>): Texture[] {
    return textureNames.map((textureName) => textures[textureName])
  }
}
