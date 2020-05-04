import { Howler } from 'howler'
import * as prism from '../util/prism'

prism.subscribe('application.volume.sound', (volume) => {
  Howler.volume(volume * 0.1)
})
