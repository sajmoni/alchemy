const chalk = require('chalk')
const path = require('path')
const os = require('os')
const fs = require('fs-extra')

const spawnCommand = require('./spawnCommand')
const getPackageJsonTemplate = require('./getPackageJsonTemplate')
const displayDoneMessage = require('./message/done')
const tryGitInit = require('./git/init')

// TODO: Debug tools
const dependencies = [
  // * Rendering
  'pixi.js',
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

const devDependencies = [
  // * Electron
  // 'electron',
  // 'electron-packager',
  // * --
  // * Code quality
  // 'eslint',
  // 'eslint-config-airbnb-base',
  // 'eslint-plugin-import',
  // 'typescript',
  // * --
  // * Module bundling
  'parcel-bundler',
  'parcel-plugin-static-files-copy',
  // * --
  // * Translations
  // '@lingui/cli',
  // '@babel/core',
  // 'babel-plugin-macros',
  // 'babel-core@bridge',
  // * --
  // * Testing
  // '@babel/preset-env',
  // '@babel/register',
  // 'ava',
  // * --
  // * Other
  // 'muncher',
]

module.exports = ({ projectName }) => {
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

  const packageJsonTemplate = getPackageJsonTemplate({ appName })

  fs.writeFileSync(
    path.join(rootPath, 'package.json'),
    JSON.stringify(packageJsonTemplate, null, 2) + os.EOL,
  )

  console.log('Installing dependencies.')
  console.log()

  // TODO: Remove pathArg
  const pathArg = ['--cwd', rootPath]
  const defaultArgs = ['add', '--exact']

  const command = 'yarn'
  const productionArgs = defaultArgs.concat(dependencies).concat(pathArg)
  const devArgs = defaultArgs.concat('--dev').concat(devDependencies).concat(pathArg)

  spawnCommand({ command, args: productionArgs })
    .then(() => spawnCommand({ command, args: devArgs }))
    .then(() => {
      console.log()
      console.log('Copying files from template')

      const templateDirectory = `${__dirname}/template`

      fs.copySync(templateDirectory, rootPath)

      tryGitInit({ rootPath, appName })

      displayDoneMessage({ name: projectName, rootPath })
    }).catch((reason) => {
      console.log()
      console.log(chalk.red('Aborting installation.'))
      console.log(`Command failed: ${chalk.cyan(reason.command)}`)
      console.log()
    })
}
