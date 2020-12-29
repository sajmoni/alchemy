import _ from 'lodash/fp'
import { Howl } from 'howler'

import createSound from './createSound'

const Sound: Record<string, Howl> = _.mapValues(createSound, {
  SWORD_01: { src: './asset/sound/Sword01.wav', volume: 0.8 },
})

export default Sound

// How to use
// import Sound from './sound'
// Sound.SWORD_01.play()
