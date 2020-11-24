import * as PIXI from 'pixi.js'

export type SceneArgs = {
  readonly container: PIXI.Container
  readonly subscribe: (
    path: string,
    callback: (value: any, previousValue: any) => void,
  ) => void
}
