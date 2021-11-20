import { Howl, HowlOptions } from 'howler'
import sounds from './sounds.json'

const soundPath = (fileName: string): string => `./asset/sound/${fileName}`

type SoundName = keyof typeof sounds

const soundEntries = Object.entries(sounds) as Array<[SoundName, HowlOptions]>

// Object.fromEntries will make TS infer key types as string (instead of SoundName)
// This is a workaround for that
const fromEntries = (
  entries: Array<[SoundName, Howl]>,
): Record<SoundName, Howl> => {
  // eslint-disable-next-line unicorn/prefer-object-from-entries, unicorn/no-array-reduce
  const returnValue = entries.reduce((acc, [soundName, howl]) => {
    return { ...acc, [soundName]: howl }
  }, {})

  return returnValue as Record<SoundName, Howl>
}

const sound: Record<SoundName, Howl> = fromEntries(
  soundEntries.map(
    ([key, howlOptions]: [SoundName, HowlOptions]): [SoundName, Howl] => {
      const value = new Howl({
        ...howlOptions,
        preload: true,
        src: soundPath(howlOptions.src as string),
      })
      return [key as SoundName, value as Howl]
    },
  ),
)

export default sound
