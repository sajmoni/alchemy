import { Howler } from 'howler'
import * as prism from 'state-prism'

const initializeSound = () => {
  prism.subscribe('application.volume.sound', (volume) => {
    Howler.volume(volume * 0.1)
  })
}

export default initializeSound
