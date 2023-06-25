import { Howl } from 'howler'
import { objectFromEntries, objectEntries } from 'ts-extras'
import type { Sounds } from '../type'

export function initializeSound<
  SoundName extends string,
  MusicName extends string,
>(sounds: Sounds) {
  const soundPath = (fileName: string): string => `./asset/sound/${fileName}`
  const musicPath = (fileName: string): string => `./asset/music/${fileName}`

  const soundEntries = objectEntries(sounds.sound)
  const soundEntriesWithHowl: Array<[SoundName, Howl]> = soundEntries.map(
    ([soundName, filename]) => {
      const howlInstance = new Howl({
        src: soundPath(filename),
        preload: true,
      })
      return [soundName as SoundName, howlInstance]
    },
  )

  const musicEntries = objectEntries(sounds.music)
  const musicEntriesWithHowl: Array<[MusicName, Howl]> = musicEntries.map(
    ([musicName, filename]) => {
      const howlInstance = new Howl({
        src: musicPath(filename),
        preload: true,
      })
      return [musicName as MusicName, howlInstance]
    },
  )

  // How to make this type available??
  type Output = {
    sound: Record<SoundName, Howl>
    music: Record<MusicName, Howl>
  }

  const sound: Output = {
    sound: objectFromEntries(soundEntriesWithHowl),
    music: objectFromEntries(musicEntriesWithHowl),
  }

  const setSoundVolume = (volume: number) => {
    for (const [, howlSound] of objectEntries(sound.sound)) {
      howlSound.volume(volume * 0.1)
    }
  }

  const setMusicVolume = (volume: number) => {
    for (const [, howlSound] of objectEntries(sound.music)) {
      howlSound.volume(volume * 0.1)
    }
  }

  return {
    sound,
    setSoundVolume,
    setMusicVolume,
  }
}
