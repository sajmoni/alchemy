import type { Application, Container, Texture } from 'pixi.js'
import { proxy } from 'valtio'
import type { Howl } from 'howler'
import type { TupleToUnion } from 'type-fest'

import type { TimerInstance } from './internal/timer'
import type createUtil from './internal/util'
import type animate from './internal/animate'
import type createUseScreenShake from './internal/useScreenShake'
import type { createGetTextures } from './internal/getTextures'
import type ExtendedParkMiller from './internal/random'
import type createSubscribeKey from './internal/subscribeKey'
import type createSubscribe from './internal/subscribe'
import type { createGetTexturesInFolder } from './internal/getTexturesInFolder'
import type { createGetTexture } from './internal/getTexture'

export type Position = {
  readonly x: number
  readonly y: number
}

export type Sounds = {
  sound: Record<string, string>
  music: Record<string, string>
}

export type InternalState<SceneKey extends string> = {
  paused: boolean
  scene: SceneKey
  timer: TimerInstance | undefined
  error: string | undefined
  time: number
}

export type Timer = Pick<TimerInstance, 'delay' | 'repeatUntil' | 'repeatEvery'>

export type Input<Keys> = {
  unsubscribe: () => void
  isKeyDown: (keyCode: TupleToUnion<Keys> | TupleToUnion<Keys>[]) => boolean
  debouncedKey: (
    key: TupleToUnion<Keys>,
    callback: () => void,
    debounceTime: number,
  ) => () => void
}

export type Sound<SoundName extends string> = Record<SoundName, Howl>

export type Music<MusicName extends string> = Record<MusicName, Howl>

export type Textures<TextureName extends string> = Record<TextureName, Texture>

export type Util = ReturnType<typeof createUtil>

export type Animate = ReturnType<typeof animate>

export type UseScreenShake = ReturnType<typeof createUseScreenShake>

export type ScreenShake = ReturnType<UseScreenShake>

export type GetTexture<TextureName extends string> = ReturnType<
  typeof createGetTexture<TextureName>
>
export type GetTextures<TextureName extends string> = ReturnType<
  typeof createGetTextures<TextureName>
>
export type GetTexturesInFolder<TextureName extends string> = ReturnType<
  typeof createGetTexturesInFolder<TextureName>
>

export type BaseScene<
  Keys extends readonly string[],
  TextureName extends string,
  State extends object,
  SceneKey extends string,
  SoundName extends string,
  MusicName extends string,
> = {
  container: Container
  input: Input<Keys>
  state: State
  internalState: InternalState<SceneKey>
  subscribeKey: ReturnType<typeof createSubscribeKey>
  subscribe: ReturnType<typeof createSubscribe>
  proxy: typeof proxy
  timer: Timer
  global: {
    timer: Timer
  }
  setScene: (sceneKey: SceneKey) => void
  sound: Sound<SoundName>
  music: Music<MusicName>
  app: Application
  util: Util
  animate: Animate
  useScreenShake: UseScreenShake
  getTexture: GetTexture<TextureName>
  getTextures: GetTextures<TextureName>
  getTexturesInFolder: GetTexturesInFolder<TextureName>
  random: ExtendedParkMiller
}

export type JuiceFn = (time: number) => number

export type AnimateOptions = {
  duration: number
  startValue?: number
  endValue?: number
}

export type Animation = {
  cancel: () => void
}

export type CancelablePromise = Promise<boolean> & {
  cancel: () => void
}
