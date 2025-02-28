#!/usr/bin/env node
import cac from 'cac'

import createSpriteSheet from './createSpriteSheet.js'
import loadSounds from './loadSounds.js'
import devServer from './devServer.js'
import createAlchemyProject from './createAlchemyProject.js'
import packageJson from '../../package.json' with { type: 'json' }

// @ts-expect-error - TODO: Figure out the types here
const cli = cac('alc')

cli.command('create', 'Create a new game').action(() => {
  createAlchemyProject()
})

cli.command('sound', 'Load sounds from the sounds folder').action(() => {
  loadSounds()
})

cli.command('sprite', 'Create sprite sheet').action(() => {
  createSpriteSheet()
})

cli.command('load', 'Load sound and sprite sheet').action(() => {
  // Create sprite sheet
})

cli.command('dev', 'Start dev server').action(() => {
  // Load sounds and sprites as they are created
  devServer()
})

cli.help()
cli.version(packageJson.version)

cli.parse()
// const parsed = cli.parse()
// console.log(JSON.stringify(parsed, null, 2))
