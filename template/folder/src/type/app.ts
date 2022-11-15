import { Container } from 'pixi.js'
import textureData from '~/public/asset/spritesheet/data.json'

export type Position = {
  readonly x: number
  readonly y: number
}

export type SceneArgs = {
  container: Container
  textures: TextureMap
}

export type Fragment<T> = [Container, (value: T) => void]

export type TextureMap = typeof textureData.frames

export type TextureName = keyof typeof textureData.frames
