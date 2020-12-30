import * as PIXI from 'pixi.js'
import { callback } from 'state-prism'

export type SceneArgs = {
  container: PIXI.Container
}

export type RenderScene = Record<string, callback>
