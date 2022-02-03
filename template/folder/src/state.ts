import dotProp from 'dot-prop'
import { proxy } from 'valtio'

import { Resolution, Scene } from '~/enum'
import { scene } from './db'

export type State = {
  application: {
    volume: {
      sound: number
      music: number
    }
    language?: string
    paused: boolean
    resolution: string
    settingsVisible: boolean
    error?: string
  }
  scene: Scene
  bar: number
  square: {
    x: number
    angle: number
  }
}

const state: State = {
  application: {
    volume: {
      sound: 1,
      music: 1,
    },
    language: undefined,
    paused: false,
    resolution: Resolution.NORMAL,
    settingsVisible: false,
    error: undefined,
  },
  scene: Scene.MAIN_MENU,
  bar: 100,
  square: {
    x: 1,
    angle: 50,
  },
}

const loadDataFromStorage = (): void => {
  state.scene = scene.get()
}

loadDataFromStorage()

export default proxy(state)
