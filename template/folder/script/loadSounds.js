#!/usr/bin/env node
const fs = require('fs-extra')
const path = require('path')
const os = require('os')

const getName = (fileName) => fileName.slice(0, fileName.lastIndexOf('.'))

// How it works:
// If sound file exists in FS and sounds file, do nothing
// If sound file exists in FS but not sounds file, add to sounds file
// TODO: If sound file exists in sounds file but not FS, delete the entry in sounds

const run = async () => {
  const soundsFilePath = path.join(__dirname, '../src/sounds.json')

  const [soundFiles, soundsUnparsed] = await Promise.all([
    fs.readdir(path.join(__dirname, '../public/asset/sound')),
    fs.readFileSync(soundsFilePath),
  ])

  const sounds = JSON.parse(soundsUnparsed)
  const soundValues = Object.values(sounds)

  const newSoundFiles = soundFiles.filter(
    (soundFile) => !soundValues.some((value) => soundFile === value.src),
  )

  const newSoundsFile = Object.fromEntries(
    Object.entries(sounds).concat(
      newSoundFiles.map((soundFile) => [
        getName(soundFile),
        { src: soundFile },
      ]),
    ),
  )

  fs.writeFileSync(
    soundsFilePath,
    JSON.stringify(newSoundsFile, null, 2) + os.EOL,
  )

  console.log()
  console.log('== Load sounds ==')
  if (newSoundFiles.length > 0) {
    console.log('New sound files detected')
    console.log(newSoundFiles)
  } else {
    console.log('No changes made')
  }

  console.log('')
}

run()
