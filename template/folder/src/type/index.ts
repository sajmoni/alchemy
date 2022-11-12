import { Container } from 'pixi.js'

export type Position = {
  readonly x: number
  readonly y: number
}

export type SceneArgs = {
  container: Container
}

export type Fragment<T> = [Container, (value: T) => void]
