import { Howl, HowlOptions } from 'howler'

const createSound = ({ src, ...rest }: HowlOptions): Howl => {
  const soundFile = new Howl({
    src,
    preload: true,
    ...rest,
  })

  return soundFile
}

export default createSound
