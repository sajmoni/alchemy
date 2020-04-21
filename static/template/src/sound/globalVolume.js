import { Howler } from 'howler'
import * as prism from '../util/prism'
import { getSoundVolume } from '../selector'

prism.subscribe(['application.volume.sound'], (state) => {
  const volume = getSoundVolume(state)
  Howler.volume(volume * 0.1)
})
