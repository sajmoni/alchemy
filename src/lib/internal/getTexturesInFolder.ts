import type { Texture } from 'pixi.js'
import { objectEntries } from 'ts-extras'
import type { Textures } from '../type'

export function createGetTexturesInFolder<
  TextureName extends string,
  FolderName extends string,
>(textures: Textures<TextureName>) {
  return function getTexturesInFolder(folderName: FolderName): Texture[] {
    return objectEntries(textures)
      .filter(([key]) => key.includes(folderName))
      .map(([, texture]) => texture)
  }
}
