import type { Container, Texture } from 'pixi.js'
import {
  OnceCallback,
  BehaviorOptions,
  ForeverCallback,
  EveryCallback,
} from 'l1'

import textureData from '~/public/asset/spritesheet/data.json'

export type Position = {
  readonly x: number
  readonly y: number
}

export type Run = {
  once: (
    callback: OnceCallback,
    delay: number,
    options?: BehaviorOptions,
  ) => void
  forever: (
    callback: ForeverCallback,
    interval: number,
    options?: BehaviorOptions,
  ) => void
  every: (
    callback: EveryCallback,
    duration: number,
    options?: BehaviorOptions,
  ) => void
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
