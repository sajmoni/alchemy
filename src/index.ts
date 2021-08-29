#!/usr/bin/env node
import process from 'node:process'
import commander from 'commander'
import chalk from 'chalk'
// @ts-expect-error No types for this lib
import CFonts from 'cfonts'

// eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error
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
  displayNoProjectNameMessage({ programName: program.name() })
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
