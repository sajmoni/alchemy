#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const fs = require('fs-extra')

const packageJson = require('./package.json')
const spawnCommand = require('./spawnCommand')

// The structure of this code is inspired by the create-react-app source code

const displayDoneMessage = ({ name, rootPath }) => {
  console.log()
  console.log(`Success! Created ${chalk.cyan(name)} at ${chalk.cyan(rootPath)}`)
  console.log()
  console.log('Start the game by typing:')
  console.log()
  console.log(chalk.cyan(`  cd ${name}`))
  console.log()
  console.log(`  ${chalk.cyan('yarn start')}`)
  console.log()
  console.log('Happy hacking!')
  console.log()
}

let projectName

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`${chalk.green('<project-directory>')} [options]`)
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
  console.log()
  console.error('Please specify the project directory:')
  console.log(
    `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`,
  )
  console.log()
  console.log('For example:')
  console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-web-game')}`)
  console.log()
  console.log(
    `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`,
  )
  console.log()
  process.exit(1)
}

const rootPath = path.resolve(projectName)
const appName = path.basename(rootPath)

if (fs.existsSync(rootPath)) {
  console.log()
  console.log(`${chalk.red('Game folder already exists')} ${chalk.green(rootPath)}`)
  console.log()
  process.exit(1)
}

console.log()
console.log(`Creating a new web game in ${chalk.green(rootPath)}`)
console.log()

fs.mkdirSync(rootPath)

const packageJsonTemplate = {
  name: appName,
  version: '0.1.0',
  private: true,
  main: 'src/electron.js',
  scripts: {
    start: 'parcel src/index.html --no-autoinstall --no-cache',
    build: 'rm -rf dist && parcel build src/index.html --public-url ./',
    elec: 'electron .',
    lint: 'eslint .',
    typecheck: 'tsc --module commonjs --allowJs --checkJs --noEmit --target es2016 src/*.js',
    'validate-ci': 'circleci config validate',
    'check-all': 'yarn lint && yarn typecheck && yarn validate-ci',
    munch: 'muncher --input asset --output static/spritesheet/spritesheet --flip',
  },
}

fs.writeFileSync(
  path.join(rootPath, 'package.json'),
  JSON.stringify(packageJsonTemplate, null, 2) + os.EOL,
)

// TODO: Sentry, google analytics or log rocket?
// TODO: State management
// TODO: Debug tools
// TODO: chance? tiny-tools?
const allDependencies = [
  'howler',
  'juice.js',
  'l1',
  'pixi.js',
  'pixi-ex',
  'electron',
  // * Translations
  '@lingui/core',
  '@lingui/macro',
  // * --
]

// TODO: Ava
// TODO: Versioning? Tag releases, generate patch notes
const devDependencies = [
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
  'muncher',
  'parcel-bundler',
  'parcel-plugin-static-files-copy',
  'typescript',
  // * Translations
  '@lingui/cli',
  '@babel/core',
  'babel-plugin-macros',
  'babel-core@bridge',
  // * --
]

console.log('Installing packages. This might take a couple of minutes.')
console.log()

const pathArg = ['--cwd', rootPath]
const defaultArgs = ['add', '--exact']

const command = 'yarnpkg'
const productionArgs = defaultArgs.concat(allDependencies).concat(pathArg)
const devArgs = defaultArgs.concat('--dev').concat(devDependencies).concat(pathArg)

spawnCommand({ command, args: productionArgs })
  .then(() => spawnCommand({ command, args: devArgs }))
  .then(() => {
  // * Get README file in order to get template directory path
    const templateDirectory = path.dirname(require.resolve('./template/README.md'))
    fs.copySync(templateDirectory, rootPath)

    // TODO: Create an initial commit
    displayDoneMessage({ name: projectName, rootPath })
  }).catch((reason) => {
    console.log()
    console.log(chalk.red('Aborting installation.'))
    console.log(`Command failed: ${chalk.cyan(reason.command)}`)
    console.log()
  })

// TODO: Tests
