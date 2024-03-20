#!/usr/bin/env node
import cac from 'cac'
import createSpriteSheet from './createSpriteSheet.js'
import loadSounds from './loadSounds.js'
import createAlchemyProject from './createAlchemyProject.js'
import devServer from './devServer.js'
import packageJson from '../../../package.json' assert { type: 'json' }

const cli = cac('alc')

cli.command('sound', 'Load sounds from the sounds folder').action(() => {
  loadSounds()
})

cli.command('sprite', 'Create sprite sheet').action(() => {
  createSpriteSheet()
})

cli.command('load', 'Load sound and sprite sheet').action(() => {
  // Create sprite sheet
})

cli.command('create [game-name]', 'Create a new game').action((gameName) => {
  createAlchemyProject(gameName)
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
