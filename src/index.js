#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')

const packageJson = require('../package.json')
const displayNoProjectNameMessage = require('./message/noProjectName')
const makeWebGame = require('./makeWebGame')

let projectName

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')}`)
  .action((name) => {
    projectName = name
  })
  .on('--help', () => {
    console.log()
    console.log(`    Only ${chalk.green('<project-directory>')} is required.`)
    console.log()
  })
  .parse(process.argv)

if (typeof projectName === 'undefined') {
  displayNoProjectNameMessage({ program })
  process.exit(1)
}

makeWebGame({ projectName })
