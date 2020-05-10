import * as prism from 'state-prism'
import { Resolution } from './constant'

type State = {
  application: {
    volume: {
      sound: number
      music: number
    }
    language: string
    paused: boolean
    resolution: string
    settingsVisible: boolean
  }
  scene: string
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
    language: null,
    paused: false,
    resolution: Resolution.NORMAL,
    settingsVisible: false,
  },
  scene: null,
  bar: 100,
  square: {
    x: 1,
    angle: 50,
  },
}

export default prism.init(state)
