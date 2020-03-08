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
  'pixi-particles@4.2.0',
  'pixi-filters@3.0.3',
  // * --
  // * Sound
  'howler@2.1.3',
  // * --
  // * Game logic
  'juice.js@1.0.6',
  'l1@0.6.1',
  'mainloop.js@1.0.4',
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
  'electron@8.1.0',
  'electron-packager@14.2.1',
  // * --
  // * Code quality
  'prettier@1.19.1',
  'eslint@6.8.0',
  'eslint-config-prettier@6.10.0',
  'typescript@3.8.3',
  // * --
  // * Module bundling
  'parcel-bundler@1.12.4',
  'parcel-plugin-static-files-copy@2.3.1',
  // * --
  // * Translations
  '@lingui/cli@2.9.1',
  '@babel/core@7.8.7',
  'babel-plugin-macros@2.8.0',
  'babel-core@bridge',
  // * --
  // * Testing
  'ava@3.4.0',
  'eslint-plugin-ava@10.2.0',
  '@ava/babel@1.0.1',
  // * --
  // * Other
  'muncher@0.0.7',
]

module.exports = ({ projectName }) => {
  const rootPath = path.resolve(projectName)
  const appName = path.basename(rootPath)

  if (fs.existsSync(rootPath)) {
    console.log()
    console.log(
      `${chalk.red('Game folder already exists')} ${chalk.green(rootPath)}`,
    )
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
  const devArgs = defaultArgs
    .concat('--dev')
    .concat(devDependencies)
    .concat(pathArg)

  spawnCommand({ command, args: productionArgs })
    .then(() => spawnCommand({ command, args: devArgs }))
    .then(() => {
      console.log()
      console.log('Copying files from template')

      const templateDirectory = `${__dirname}/template`

      try {
        fs.copySync(templateDirectory, rootPath)
      } catch (error) {
        console.log(
          `${chalk.red('  Error: Could not copy template files: ')} ${error}`,
        )
      }

      fs.moveSync(
        path.join(rootPath, 'gitignore'),
        path.join(rootPath, '.gitignore'),
        [],
      )

      tryGitInit({ rootPath, appName })

      displayDoneMessage({ name: projectName, rootPath })
    })
    .catch(reason => {
      console.log()
      console.log(chalk.red('Aborting installation.'))
      console.log(`Command failed: ${chalk.cyan(reason.command)}`)
      console.log()
    })
}
