import * as PIXI from 'pixi.js'

type render<T> = (value: T) => void

export type UIComponent<T> = [PIXI.Container, render<T>]
