import { Howl } from 'howler'

const createSound = ({ src, ...rest }: { src: string }): Howl => {
  const soundFile = new Howl({
    src,
    preload: true,
    ...rest,
  })

  return soundFile
}

export default createSound
