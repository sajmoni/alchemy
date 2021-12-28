import { getTextures as getTexturesEx } from 'pixi-ex'

import textureData from '~/public/asset/spritesheet/data.json'

const getTextures = (textureNames: Array<keyof typeof textureData.frames>) =>
  getTexturesEx(textureNames)

export default getTextures
