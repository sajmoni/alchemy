import { Howl } from 'howler'

import type { Sounds } from '../type'

export function initializeSound<
  SoundName extends string,
  MusicName extends string,
>(sounds: Sounds) {
  const soundPath = (fileName: string): string => `./asset/sound/${fileName}`
  const musicPath = (fileName: string): string => `./asset/music/${fileName}`

  const soundEntries = Object.entries(sounds.sound)
  const soundEntriesWithHowl: Array<[SoundName, Howl]> = soundEntries.map(
    ([soundName, filename]) => {
      const howlInstance = new Howl({
        src: soundPath(filename),
        preload: true,
      })
      return [soundName as SoundName, howlInstance]
    },
  )

  const musicEntries = Object.entries(sounds.music)
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
    sound: Object.fromEntries(soundEntriesWithHowl) as Record<SoundName, Howl>,
    music: Object.fromEntries(musicEntriesWithHowl) as Record<MusicName, Howl>,
  }

  const setSoundVolume = (volume: number) => {
    for (const [, howlSound] of Object.entries(sound.sound)) {
      ;(howlSound as Howl).volume(volume * 0.1)
    }
  }

  const setMusicVolume = (volume: number) => {
    for (const [, howlSound] of Object.entries(sound.music)) {
      ;(howlSound as Howl).volume(volume * 0.1)
    }
  }

  return {
    sound,
    setSoundVolume,
    setMusicVolume,
  }
}
