#!/usr/bin/env node
import cac from 'cac'
import createAlchemyProject from './createAlchemyProject.js'
import packageJson from '../package.json' assert { type: 'json' }

const cli = cac('create-alchemy')

cli.command('create [game-name]', 'Create a new game').action((gameName) => {
  createAlchemyProject(gameName)
})

cli.help()
cli.version(packageJson.version)

cli.parse()
// const parsed = cli.parse()
// console.log(JSON.stringify(parsed, null, 2))
