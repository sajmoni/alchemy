import { Howler } from 'howler'
import { subscribeKey } from 'valtio/utils'

import state from '/state'

const initializeSound = (): void => {
  subscribeKey(state.application.volume, 'sound', (volume) => {
    Howler.volume(volume * 0.1)
  })
}

export default initializeSound
