import { Howl } from 'howler'

const sound = ({ src, ...rest }: { src: string }) => {
  const soundFile = new Howl({
    src,
    preload: true,
    ...rest,
  })

  return soundFile
}

export default sound
