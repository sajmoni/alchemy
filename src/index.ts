#!/usr/bin/env node

import commander from 'commander'
import chalk from 'chalk'
import CFonts from 'cfonts'

// @ts-ignore
import packageJson from '../package.json'
import displayNoProjectNameMessage from './message/noProjectName'
import makeWebGame from './makeWebGame'

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

console.log()
CFonts.say(`${packageJson.name}`, {
  font: 'tiny',
  colors: ['#4034eb'],
  space: false,
})
console.log(` v${packageJson.version}`)
console.log()

makeWebGame({ projectName })
