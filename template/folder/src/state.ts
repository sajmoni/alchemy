import * as prism from 'state-prism'
import dotProp from 'dot-prop'

import * as ls from '/util/storage'
import { Resolution, Scene } from '/enum'

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

type LoadData = {
  path: string
  defaultValue: string | number
}

const DATA_TO_LOAD_FROM_STORAGE: LoadData[] = [
  {
    path: 'scene',
    defaultValue: Scene.MAIN_MENU,
  },
]

const loadDataFromStorage = (): void => {
  for (const { path, defaultValue } of DATA_TO_LOAD_FROM_STORAGE) {
    const restoredValue = ls.get(path)
    dotProp.set(state, path, restoredValue ?? defaultValue)
  }
}

loadDataFromStorage()

export default prism.init(state)
