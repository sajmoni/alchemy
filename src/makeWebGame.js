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
  'pixi.js@5.2.1',
  'pixi-ex@0.0.6',
  'pixi-filters@3.0.3',
  // * --
  // * Sound
  'howler@2.1.3',
  // * --
  // * Game logic
  'juice.js@1.0.6',
  'l1@0.6.1',
  // * --
  // * Util
  'lodash@4.17.15',
  // TODO: Replace with Prism
  'on-change@1.6.2',
  // * --
  // * Translations
  '@lingui/core@2.9.1',
  '@lingui/macro@2.9.1',
  // * --
]

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

      // Rename gitignore to prevent npm from renaming it to .npmignore
      // See: https://github.com/npm/npm/issues/1862
      fs.moveSync(
        path.join(rootPath, 'gitignore'),
        path.join(rootPath, '.gitignore'),
        [],
      )

      tryGitInit({ rootPath, appName })

      displayDoneMessage({ name: projectName, rootPath })
    }).catch((reason) => {
      console.log()
      console.log(chalk.red('Aborting installation.'))
      console.log(`Command failed: ${chalk.cyan(reason.command)}`)
      console.log()
    })
}
