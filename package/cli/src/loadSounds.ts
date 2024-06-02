import path from 'node:path'
import fs from 'node:fs/promises'
import os from 'node:os'

import { loadJsonFile } from 'load-json-file'
import chalk from 'chalk'

type SoundsJSONValues = Record<string, string>

type SoundsJSON = {
  sound: SoundsJSONValues
  music: SoundsJSONValues
}

const getNameFromFilename = (fileName: string): string =>
  fileName.slice(0, fileName.lastIndexOf('.'))

// Three possible outcomes:
// 1. If sound file exists in FS and sounds.json, do nothing
// 2. If sound file exists in FS but NOT in sounds.json, add to sounds.json
// 3. If sound file exists in sounds.json but NOT in FS, remove from sounds.json

const getNotExistingInJson = (files: string[], inJson: SoundsJSONValues) => {
  const values = Object.values(inJson)
  return files.filter((filename) => !values.includes(filename))
}

const getNotExistingInFileSystem = (
  files: string[],
  inJson: SoundsJSONValues,
) => {
  const values = Object.values(inJson)
  return values.filter((filenameInJson) => !files.includes(filenameInJson))
}

export default async function loadSounds() {
  const rootPath = './src'
  const soundsJsonPath = path.join(rootPath, `sounds.json`)
  const soundFilesPath = path.join(rootPath, `public/asset/sound`)
  const musicFilesPath = path.join(rootPath, `public/asset/music`)

  const [soundFiles, musicFiles, soundsJson] = await Promise.all([
    fs.readdir(soundFilesPath),
    fs.readdir(musicFilesPath),
    loadJsonFile<SoundsJSON>(soundsJsonPath),
  ])

  // TODO: Make this dynamic to allow for custom categories
  const soundsJsonSounds = soundsJson.sound
  const soundsJsonMusic = soundsJson.music

  const soundsNotExistingInJson = getNotExistingInJson(
    soundFiles,
    soundsJsonSounds,
  )
  const musicNotExistingInJson = getNotExistingInJson(
    musicFiles,
    soundsJsonMusic,
  )
  const soundsNotExistingInFileSystem = getNotExistingInFileSystem(
    soundFiles,
    soundsJsonSounds,
  )
  const musicNotExistingInFileSystem = getNotExistingInFileSystem(
    musicFiles,
    soundsJsonMusic,
  )

  const newSoundsJson: SoundsJSON = {
    sound: Object.fromEntries(
      Object.entries(soundsJsonSounds)
        .filter(
          ([, filepath]) => !soundsNotExistingInFileSystem.includes(filepath),
        )
        .concat(
          soundsNotExistingInJson.map((filepath) => [
            getNameFromFilename(filepath),
            filepath,
          ]),
        ),
    ),
    music: Object.fromEntries(
      Object.entries(soundsJsonMusic)
        .filter(
          ([, filepath]) => !musicNotExistingInFileSystem.includes(filepath),
        )
        .concat(
          musicNotExistingInJson.map((filepath) => [
            getNameFromFilename(filepath),
            filepath,
          ]),
        ),
    ),
  }

  console.log()
  console.log(chalk.bold('== Load sounds =='))
  console.log()

  if (
    soundsNotExistingInJson.length > 0 ||
    musicNotExistingInJson.length > 0 ||
    soundsNotExistingInFileSystem.length > 0 ||
    musicNotExistingInFileSystem.length > 0
  ) {
    await fs.writeFile(
      soundsJsonPath,
      JSON.stringify(newSoundsJson, null, 2) + os.EOL,
    )
  } else {
    console.log(chalk.gray.italic('No changes made'))
    console.log()
  }

  if (soundsNotExistingInJson.length > 0) {
    console.log(`New ${chalk.bold.cyan('sound')} files detected:`)
    console.log(soundsNotExistingInJson)
    console.log()
  }

  if (musicNotExistingInJson.length > 0) {
    console.log(`New ${chalk.bold.cyan('music')} files detected:`)
    console.log(musicNotExistingInJson)
    console.log()
  }

  if (soundsNotExistingInFileSystem.length > 0) {
    console.log(`Removed ${chalk.bold.cyan('sound')} in sounds.json:`)
    console.log(soundsNotExistingInFileSystem)
    console.log()
  }

  if (musicNotExistingInFileSystem.length > 0) {
    console.log(`Removed ${chalk.bold.cyan('music')} in sounds.json:`)
    console.log(musicNotExistingInFileSystem)
    console.log()
  }
}
