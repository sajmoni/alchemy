#!/usr/bin/env node

const commander = require('commander')
const chalk = require('chalk')
const path = require('path')
const os = require('os')
const fs = require('fs-extra')
const { execSync } = require('child_process')

const packageJson = require('./package.json')
const spawnCommand = require('./spawnCommand.js')

// The structure of this code is inspired by the create-react-app source code

const displayDoneMessage = ({ name, rootPath }) => {
  console.log()
  console.log(`${chalk.green('Success!')} Created ${chalk.cyan(name)} at ${chalk.cyan(rootPath)}`)
  console.log()
  console.log('Start the game by typing:')
  console.log()
  console.log(chalk.cyan(`  cd ${name}`))
  console.log()
  console.log(`  ${chalk.cyan('yarn start')}`)
  console.log()
  console.log('Good luck!')
  console.log()
}

const tryGitInit = ({ rootPath, appName }) => {
  let didInit = false
  try {
    execSync(`git init ${appName}`, { stdio: 'ignore' })
    didInit = true

    execSync(`git -C ${appName}/ add -A`, { stdio: 'ignore' })

    execSync(`git -C ${appName}/ commit -m "Initial commit from Make Web Game"`, {
      stdio: 'ignore',
    })

    execSync(`git -C ${appName}/ branch release`, { stdio: 'ignore' })

    return true
  } catch (e) {
    if (didInit) {
      // If we successfully initialized but couldn't commit,
      // maybe the commit author config is not set.
      // Remove the Git files to avoid a half-done state.
      // TODO: Test this by adding to use-cases file
      try {
        fs.removeSync(path.join(rootPath, '.git'))
      } catch (removeErr) {
        // Ignore.
      }
    }
    return false
  }
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
  main: './electron.js',
  scripts: {
    start: 'parcel src/index.html --no-autoinstall --no-cache',
    build: 'rm -rf dist && parcel build src/index.html --public-url ./',
    test: 'ava',
    lint: 'eslint .',
    typecheck: 'tsc --module commonjs --allowJs --checkJs --noEmit --target es2016 src/*.js',
    'validate-ci': 'circleci config validate',
    'check-all': 'yarn lint && yarn typecheck && yarn validate-ci',
    munch: 'muncher --input sprite --output static/spritesheet/spritesheet --flip',
    'add-locale': 'lingui add-locale',
    extract: 'lingui extract --clean --overwrite',
    compile: 'lingui compile',
    'elec:start': 'electron .',
    'elec:build': 'rm -rf dist && parcel build src/index.html --public-url ./ --target electron',
    'elec:pack': 'yarn electron-packager . --overwrite',
    'elec:run': `open ${appName}-darwin-x64/${appName}.app`,
    'elec:all': 'yarn elec:build && yarn elec:pack && yarn elec:run',
  },
  ava: {
    require: [
      '@babel/register',
    ],
  },
}

fs.writeFileSync(
  path.join(rootPath, 'package.json'),
  JSON.stringify(packageJsonTemplate, null, 2) + os.EOL,
)

// TODO: Sentry
// TODO: Debug tools
const allDependencies = [
  // TODO: Figure out how Pixi handles versioning
  // * Rendering
  'pixi.js@5.2.0',
  'pixi-ex',
  // * --
  // * Sound
  'howler',
  // * --
  // * Game logic
  'juice.js',
  'l1',
  // * --
  // * Util
  'lodash',
  // TODO: Replace with Prism
  'on-change',
  // * --
  // * Translations
  '@lingui/core',
  '@lingui/macro',
  // * --
]

// TODO: Versioning? Tag releases, generate patch notes
const devDependencies = [
  // * Electron
  'electron',
  'electron-packager',
  // * --
  // * Code quality
  'eslint',
  'eslint-config-airbnb-base',
  'eslint-plugin-import',
  'typescript',
  // * --
  // * Module bundling
  'parcel-bundler',
  'parcel-plugin-static-files-copy',
  // * --
  // * Translations
  '@lingui/cli',
  '@babel/core',
  'babel-plugin-macros',
  'babel-core@bridge',
  // * --
  // * Testing
  '@babel/preset-env',
  '@babel/register',
  'ava',
  // * --
  // * Other
  'muncher',
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
    console.log()
    console.log('Copying files from template')

    const templateDirectory = `${__dirname}/template`

    fs.copySync(templateDirectory, rootPath)

    if (tryGitInit({ rootPath, appName })) {
      console.log()
      console.log('Initialized a git repository.')
    }

    displayDoneMessage({ name: projectName, rootPath })
  }).catch((reason) => {
    console.log()
    console.log(chalk.red('Aborting installation.'))
    console.log(`Command failed: ${chalk.cyan(reason.command)}`)
    console.log()
  })
