import type { Container, Texture } from 'pixi.js'
import { BehaviorOptions } from 'l1'

import textureData from '~/public/asset/spritesheet/data.json'

export type Position = {
  readonly x: number
  readonly y: number
}

export type Run = {
  forever: (callback: any, interval: number, options?: BehaviorOptions) => void
  every: (callback: any, duration: number, options?: BehaviorOptions) => void
  delay: (delay: number, options?: BehaviorOptions) => Promise<void>
}

export type SceneArgs = {
  container: Container
  textures: TextureMap
  run: Run
}

export type Fragment<T> = [Container, (value: T) => void]

export type TextureName = keyof typeof textureData.frames

export type TextureMap = Record<TextureName, Texture>
