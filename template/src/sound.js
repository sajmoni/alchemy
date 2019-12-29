import { Howl } from 'howler'
import _ from 'lodash/fp'

// Typescript erroneously reports this as an error
// @ts-ignore
import sword01 from './asset/sound/Sword01.wav'

const sound = ({ src, ...rest }) => {
  const soundFile = new Howl({
    src: [src],
    preload: true,
    ...rest,
  })

  return soundFile
}

export default _.mapValues(sound,
  {
    SWORD_01: { src: sword01, volume: 0.8 },
  })

// How to use
// Sound.SWORD_01.play()
