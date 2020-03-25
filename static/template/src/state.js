import { Resolution, Scene } from './constant'
import { init } from './util/prism'

export default init({
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
  scene: Scene.MAIN_MENU,
  bar: 100,
  square: {
    x: 1,
    angle: 50,
    visible: true,
  },
})
