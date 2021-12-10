#!/usr/bin/env node

import fs from 'fs-extra'
import { HowlOptions } from 'howler'

import path from 'node:path'
import os from 'node:os'

const getNameFromFilename = (fileName: string): string =>
  fileName.slice(0, fileName.lastIndexOf('.'))

// Three possible outcomes:
// 1. If sound file exists in FS and sounds.json, do nothing
// 2. If sound file exists in FS but NOT in sounds.json, add to sounds.json
// 3. If sound file exists in sounds.json but NOT in FS, remove from sounds.json

const run = async () => {
  const soundsJsonPath = path.join(__dirname, '../src/sounds.json')
  const soundFilesPath = path.join(__dirname, '../src/public/asset/sound')

  const [soundFiles, soundsJsonUnparsed]: [string[], Buffer] =
    await Promise.all([
      fs.readdir(soundFilesPath),
      fs.readFileSync(soundsJsonPath),
    ])

  const soundsJson: Record<string, HowlOptions> = JSON.parse(
    soundsJsonUnparsed.toString(),
  )
  const soundsJsonValues = Object.values(soundsJson)

  // Detect sound files in sounds.json that no longer exist
  const soundFilesNoLongerExisting = soundsJsonValues
    .filter(({ src }) => !soundFiles.includes(src))
    .map(({ src }) => src)

  const newSoundsFileWithoutSoundsNoLongerExisting = Object.fromEntries(
    Object.entries(soundsJson).filter(([, { src }]) => {
      return soundFiles.includes(src)
    }),
  )

  // Add new sound files to sounds.json
  const newSoundFiles = soundFiles.filter(
    (soundFile) => !soundsJsonValues.some((value) => soundFile === value.src),
  )

  const newSoundsFile = Object.fromEntries(
    Object.entries(newSoundsFileWithoutSoundsNoLongerExisting).concat(
      newSoundFiles.map((soundFile) => [
        getNameFromFilename(soundFile),
        { src: soundFile },
      ]),
    ),
  )

  fs.writeFileSync(
    soundsJsonPath,
    JSON.stringify(newSoundsFile, null, 2) + os.EOL,
  )

  console.log()
  console.log('== Load sounds ==')
  if (soundFilesNoLongerExisting.length === 0 && newSoundFiles.length === 0) {
    console.log('No changes made')
    console.log()
  } else {
    if (newSoundFiles.length > 0) {
      console.log('New sound files detected:')
      console.log(newSoundFiles)
      console.log()
    }
    if (soundFilesNoLongerExisting.length > 0) {
      console.log('Removed entries in sounds.json:')
      console.log(soundFilesNoLongerExisting)
      console.log()
    }
  }
}

run()
