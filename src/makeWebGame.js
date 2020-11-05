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
  'pixi.js@5.3.2',
  'pixi-ex@0.0.10',
  'pixi-particles@4.2.1',
  // * --
  // * Sound
  'howler@2.2.0',
  // * --
  // * Game logic
  'juice.js@1.0.6',
  'l1@0.7.0',
  'mainloop.js@1.0.4',
  // * --
  // * Util
  'lodash@4.17.19',
  'state-prism@0.0.3',
  'nano-panel@0.0.2',
  'mousetrap@1.6.5',
]

const devDependencies = [
  // * Code quality
  'xo@0.32.1',
  'typescript@3.9.7',
  // * --
  // * Module bundling
  'parcel-bundler@1.12.4',
  'parcel-plugin-static-files-copy@2.4.3',
  // * --
  '@babel/preset-env@7.10.4',
  // * --
  // * Testing
  'ava@3.11.0',
  '@babel/register@7.10.5',
  '@babel/core@7.10.5',
  // * --
  // * Other
  'plop@2.7.3',
  'muncher@0.0.13',
  '@babel/preset-typescript@7.10.4',
  '@types/node@14.0.26',
  // * Labs
  'react@16.13.1',
  'react-dom@16.13.1',
  'styled-components@5.1.1',
  '@types/react@16.9.43',
  '@types/react-dom@16.9.8',
  '@types/styled-components@5.1.1',
  'eslint-config-xo-react@0.23.0',
  'eslint-plugin-react@7.20.4',
  'eslint-plugin-react-hooks@4.0.8',
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
        } catch {
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
        const templateDirectory = path.join(__dirname, `/template`)

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
          // @ts-expect-error
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
          } catch {
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
