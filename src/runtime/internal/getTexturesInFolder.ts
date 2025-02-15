import type { Texture } from 'pixi.js'

import type { Textures } from '../type'

function getFolderName(input: string): string {
  return input.substring(0, input.indexOf('/'))
}

export function createGetTexturesInFolder<TextureName extends string>(
  textures: Textures<TextureName>,
) {
  return function getTexturesInFolder(folderName: string): Texture[] {
    return Object.entries(textures)
      .filter(([key]) => getFolderName(key as TextureName).includes(folderName))
      .map(([, texture]) => texture as Texture)
  }
}
