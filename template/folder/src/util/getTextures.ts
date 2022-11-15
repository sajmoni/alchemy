import { Texture } from 'pixi.js'

import { TextureMap, TextureName } from '~/type/app'

const getTextures = (
  textureMap: TextureMap,
  textureNames: Array<TextureName>,
): Texture[] => {
  return textureNames.map((textureName) => textureMap[textureName])
}

export default getTextures
