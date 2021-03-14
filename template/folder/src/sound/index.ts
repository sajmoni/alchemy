import _ from 'lodash/fp'
import { Howl } from 'howler'

import createSound from './createSound'

const soundPath = (fileName: string) => `./asset/sound/${fileName}.mp3`

const Sound: Record<string, Howl> = _.mapValues(createSound, {
  COIN: { src: soundPath('coin'), volume: 0.8 },
})

export default Sound

// How to use
// import Sound from './sound'
// Sound.COIN.play()
