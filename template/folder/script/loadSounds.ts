#!/usr/bin/env node
import path from 'node:path'
import os from 'node:os'
import { Buffer } from 'node:buffer'
import fs from 'fs-extra'

type SoundsJSONValues = Record<string, string>

type SoundsJSON = {
  sound: SoundsJSONValues
  music: SoundsJSONValues
}

// TODO: Use tiny-toolkit
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

const run = async () => {
  const soundsJsonPath = path.join(__dirname, '../src/sounds.json')
  const soundFilesPath = path.join(__dirname, '../src/public/asset/sound')
  const musicFilesPath = path.join(__dirname, '../src/public/asset/music')

  const [soundFiles, musicFiles, soundsJsonUnparsed]: [
    string[],
    string[],
    Buffer,
  ] = await Promise.all([
    fs.readdir(soundFilesPath),
    fs.readdir(musicFilesPath),
    fs.readFileSync(soundsJsonPath),
  ])

  const soundsJson: SoundsJSON = JSON.parse(soundsJsonUnparsed.toString())
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
            `./${filepath}`,
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
            `./${filepath}`,
          ]),
        ),
    ),
  }

  console.log()
  console.log('== Load sounds ==')

  if (
    soundsNotExistingInJson.length > 0 ||
    musicNotExistingInJson.length > 0 ||
    soundsNotExistingInFileSystem.length > 0 ||
    musicNotExistingInFileSystem.length > 0
  ) {
    fs.writeFileSync(
      soundsJsonPath,
      JSON.stringify(newSoundsJson, null, 2) + os.EOL,
    )
  } else {
    console.log('No changes made')
    console.log()
  }

  if (soundsNotExistingInJson.length > 0) {
    console.log('New sound files detected:')
    console.log(soundsNotExistingInJson)
    console.log()
  }

  if (musicNotExistingInJson.length > 0) {
    console.log('New music files detected:')
    console.log(musicNotExistingInJson)
    console.log()
  }

  if (soundsNotExistingInFileSystem.length > 0) {
    console.log('Removed sounds in sounds.json:')
    console.log(soundsNotExistingInFileSystem)
    console.log()
  }

  if (musicNotExistingInFileSystem.length > 0) {
    console.log('Removed music in sounds.json:')
    console.log(musicNotExistingInFileSystem)
    console.log()
  }
}

void run()
