const chalk = require('chalk')
const path = require('path')
const os = require('os')
const fs = require('fs-extra')
const execa = require('execa')
const Listr = require('listr')

const getPackageJsonTemplate = require('./getPackageJsonTemplate')
const createFileFromTemplate = require('./createFileFromTemplate')
const displayDoneMessage = require('./message/done')

const dependencies = [
  // * Rendering
  'pixi.js@5.2.3',
  'pixi-ex@0.0.7',
  'pixi-particles@4.2.1',
  'pixi-filters@3.1.1',
  // * --
  // * Sound
  'howler@2.1.3',
  // * --
  // * Game logic
  'juice.js@1.0.6',
  'l1@0.7.0-0',
  'mainloop.js@1.0.4',
  // * --
  // * Util
  'lodash@4.17.15',
  'state-prism@0.0.1',
  'mousetrap@1.6.5',
  // * --
  // * Translations
  '@lingui/core@2.9.1',
  '@lingui/macro@2.9.1',
  // * --
]

const devDependencies = [
  // * Electron
  'electron@8.1.1',
  'electron-packager@14.2.1',
  // * --
  // * Code quality
  'xo@0.30.0',
  'typescript@3.8.3',
  // * --
  // * Module bundling
  'parcel-bundler@1.12.4',
  'parcel-plugin-static-files-copy@2.3.1',
  // * --
  // * Translations
  '@lingui/cli@2.9.1',
  '@babel/core@7.9.6',
  'babel-plugin-macros@2.8.0',
  '@babel/preset-env@7.9.6',
  // * --
  // * Testing
  'ava@3.8.1',
  '@babel/register@7.9.0',
  // * --
  // * Other
  'yup@0.28.5',
  '@babel/node@7.8.7',
  'plop@2.6.0',
  'muncher@0.0.13',
  '@babel/preset-typescript@7.9.0',
  '@types/node@13.13.4',
  // * Labs
  'react@16.13.1',
  'react-dom@16.13.1',
  'styled-components@5.1.0',
  '@types/react@16.9.34',
  '@types/react-dom@16.9.7',
  '@types/styled-components@5.1.0',
  'eslint-config-xo-react@0.23.0',
  'eslint-plugin-react@7.19.0',
  'eslint-plugin-react-hooks@4.0.0',
]

module.exports = ({ projectName }) => {
  const rootPath = path.resolve(projectName)

  console.log(` Creating a new web game in ${chalk.green(rootPath)}`)
  console.log()

  const tasks = new Listr([
    {
      title: 'Create project folder',
      task: () => {
        if (fs.existsSync(rootPath)) {
          throw new Error('Project folder already exists')
        }

        fs.mkdirSync(rootPath)

        const packageJsonTemplate = getPackageJsonTemplate({ projectName })
        fs.writeFileSync(
          path.join(rootPath, 'package.json'),
          JSON.stringify(packageJsonTemplate, null, 2) + os.EOL,
        )
        return true
      },
    },
    {
      title: 'Git init',
      task: () => {
        try {
          // * Change directory so that Husky gets installed in the right .git folder
          process.chdir(rootPath)
        } catch (_) {
          throw new Error(`Could not change to project directory: ${rootPath}`)
        }

        try {
          execa.sync('git', ['init'])

          return true
        } catch (error) {
          throw new Error(`Git repo not initialized ${error}`)
        }
      },
    },
    {
      title: 'Copy template files',
      task: () => {
        const templateDirectory = `${__dirname}/template`

        try {
          fs.copySync(`${templateDirectory}/folder`, rootPath)
        } catch (error) {
          throw new Error(`Could not copy template files: ${error}`)
        }

        createFileFromTemplate({
          source: 'storage.template.js',
          destination: path.join(rootPath, 'src/util/storage.js'),
          options: { projectName },
        })

        // * Rename gitignore to prevent npm from renaming it to .npmignore
        // * See: https://github.com/npm/npm/issues/1862
        fs.moveSync(
          path.join(rootPath, 'gitignore'),
          path.join(rootPath, '.gitignore'),
          // @ts-ignore
          [],
        )
      },
    },
    {
      title: 'Install dependencies',
      task: () => {
        const command = 'yarn'
        const defaultArgs = ['add', '--exact']

        const productionArgs = defaultArgs.concat(dependencies)
        const devArgs = defaultArgs.concat('--dev').concat(devDependencies)

        return execa(command, devArgs)
          .then(() => execa(command, productionArgs))
          .catch((error) => {
            throw new Error(`Could not install dependencies, ${error}`)
          })
      },
    },
    {
      title: 'Git commit',
      task: () => {
        try {
          execa.sync('git', ['add', '-A'])

          execa.sync('git', [
            'commit',
            '--no-verify',
            '-m',
            'Initialize project using make-web-game',
          ])

          execa.sync('git', ['branch', 'release'])

          return true
        } catch (error) {
          // * It was not possible to commit.
          // * Maybe the commit author config is not set.
          // * Remove the Git files to avoid a half-done state.
          try {
            fs.removeSync(path.join(rootPath, '.git'))
            throw new Error(`Could not create commit ${error}`)
          } catch (_) {
            throw new Error(`Could not create commit ${error}`)
          }
        }
      },
    },
  ])

  tasks
    .run()
    .then(() => {
      displayDoneMessage({ name: projectName, rootPath })
    })
    .catch((error) => {
      console.log()
      console.error(chalk.red(error))
      console.log()
      process.exit(1)
    })
}
