import { getTexture as getTextureEx } from 'pixi-ex'

import textureData from '~/public/asset/spritesheet/data.json'

const getTexture = (textureName: keyof typeof textureData.frames) =>
  getTextureEx(textureName)

export default getTexture
