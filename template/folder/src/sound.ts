import { Howl } from 'howler'
import { objectFromEntries, objectEntries } from 'ts-extras'

import sounds from './sounds.json'

const soundPath = (fileName: string): string => `./asset/sound/${fileName}`
const musicPath = (fileName: string): string => `./asset/music/${fileName}`

type SoundName = keyof typeof sounds.sound
type MusicName = keyof typeof sounds.music

const soundEntries = objectEntries(sounds.sound)
const soundEntriesWithHowl: Array<[SoundName, Howl]> = soundEntries.map(
  ([soundName, filename]) => {
    const howlInstance = new Howl({ src: soundPath(filename), preload: true })
    return [soundName, howlInstance]
  },
)

const musicEntries = objectEntries(sounds.music)
const musicEntriesWithHowl: Array<[MusicName, Howl]> = musicEntries.map(
  ([musicName, filename]) => {
    const howlInstance = new Howl({ src: musicPath(filename), preload: true })
    return [musicName, howlInstance]
  },
)

type Output = {
  sound: Record<SoundName, Howl>
  music: Record<MusicName, Howl>
}

const sound: Output = {
  sound: objectFromEntries(soundEntriesWithHowl),
  music: objectFromEntries(musicEntriesWithHowl),
}

export const setSoundVolume = (volume: number) => {
  for (const howlSound of Object.values(sound.sound)) {
    howlSound.volume(volume * 0.1)
  }
}

export const setMusicVolume = (volume: number) => {
  for (const howlSound of Object.values(sound.music)) {
    howlSound.volume(volume * 0.1)
  }
}

export default sound
