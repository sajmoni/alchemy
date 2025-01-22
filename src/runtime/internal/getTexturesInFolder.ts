import type { Texture } from 'pixi.js'
import { objectEntries } from 'ts-extras'
import type { Textures } from '../type'

function getFolderName(input: string): string {
  return input.substring(0, input.indexOf('/'))
}

export function createGetTexturesInFolder<TextureName extends string>(
  textures: Textures<TextureName>,
) {
  return function getTexturesInFolder(folderName: string): Texture[] {
    return objectEntries(textures)
      .filter(([key]) => getFolderName(key).includes(folderName))
      .map(([, texture]) => texture)
  }
}
