import { Howler } from 'howler'
import * as prism from '../util/prism'
import { getVolume } from '../selector'

prism.subscribe(['application.volume'], (state) => {
  const volume = getVolume(state)
  Howler.volume(volume * 0.1)
})
