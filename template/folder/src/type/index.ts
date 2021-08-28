import * as PIXI from 'pixi.js'

export type Position = {
  readonly x: number
  readonly y: number
}

export type SceneArgs = {
  container: PIXI.Container
}

export type Fragment<T> = [PIXI.Container, (value: T) => void]
