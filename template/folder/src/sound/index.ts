import _ from 'lodash/fp'
import { Howl } from 'howler'

// eslint-disable-next-line import/no-unassigned-import
import './globalVolume'
import createSound from './createSound'

// Typescript erroneously reports this as an error
// @ts-expect-error
import sword01 from '../../asset/sound/Sword01.wav'

// @ts-expect-error
const Sound: Record<string, Howl> = _.mapValues(createSound, {
  SWORD_01: { src: sword01, volume: 0.8 },
})

export default Sound

// How to use
// import Sound from './sound'
// Sound.SWORD_01.play()
