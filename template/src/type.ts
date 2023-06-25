import { type BaseScene } from 'alchemy-engine'

import textureData from '~/public/asset/spritesheet/data.json'
import sounds from './sounds.json'
import { keys, scenes, state } from './data'

export type Keys = typeof keys
export type TextureName = keyof typeof textureData.frames
export type State = typeof state
export type SceneKey = keyof typeof scenes
export type SoundName = keyof typeof sounds.sound
export type MusicName = keyof typeof sounds.music

export type Scene = BaseScene<
  Keys,
  TextureName,
  State,
  SceneKey,
  SoundName,
  MusicName
>
