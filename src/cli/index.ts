#!/usr/bin/env node
import cac from 'cac'

import generateSpriteSheet from './generateSpriteSheet.js'
import loadSounds from './loadSounds.js'
import devServer from './devServer.js'
import createAlchemyProject from './createAlchemyProject.js'
import packageJson from '../../package.json' with { type: 'json' }

// @ts-expect-error - TODO: Figure out the types here
const cli = cac('alc')

cli.command('init', 'Initialize a new game').action(() => {
  createAlchemyProject()
})

cli.command('sound', 'Load sounds from the sounds folder').action(() => {
  loadSounds()
})

cli.command('sprite', 'Generate sprite sheet').action(() => {
  generateSpriteSheet()
})

cli
  .command(
    'dev',
    'Start dev server - Load sounds and sprites as they are created',
  )
  .action(() => {
    devServer()
  })

cli.help()
cli.version(packageJson.version)

cli.parse()
