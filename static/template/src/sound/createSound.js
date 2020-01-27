import { Howl } from 'howler'

const sound = ({ src, ...rest }) => {
  const soundFile = new Howl({
    src: [src],
    preload: true,
    ...rest,
  })

  return soundFile
}

export default sound
