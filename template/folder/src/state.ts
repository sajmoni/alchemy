import { proxy } from 'valtio'

import { Render, Resolution, Scene } from '~/enum/app'
import { scene } from './ls'

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
  player: {
    x: number
    y: number
    angle: number
  }
}

const state: State = {
  application: {
    volume: {
      sound: 5,
      music: 5,
    },
    language: undefined,
    paused: false,
    resolution: Resolution.NORMAL,
    settingsVisible: false,
    error: undefined,
  },
  scene: Scene.MAIN_MENU,
  bar: 100,
  player: {
    x: 10,
    y: Render.GAME_HEIGHT / 2,
    angle: 50,
  },
}

const loadDataFromStorage = (): void => {
  state.scene = scene.get()
}

loadDataFromStorage()

export default proxy(state)
