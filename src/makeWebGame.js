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
  'pixi.js@5.3.3',
  'pixi-ex@0.0.11',
  'pixi-particles@4.3.0',
  // * --
  // * Sound
  'howler@2.2.1',
  // * --
  // * Game logic
  'juice.js@2.0.0',
  'l1@0.7.0',
  'mainloop.js@1.0.4',
  // * --
  // * Util
  'lodash@4.17.20',
  'state-prism@0.0.3',
  'mousetrap@1.6.5',
  'dot-prop@6.0.1',
]

const devDependencies = [
  // * Code quality
  'xo@0.34.2',
  'typescript@4.0.5',
  'husky@4.3.0',
  'lint-staged@10.5.2',
  'eslint-plugin-lodash-fp@2.2.0-a1',
  'eslint-plugin-fp@2.3.0',
  // * --
  // * Module bundling
  'esbuild@0.8.22',
  'serve-handler@6.1.3',
  'fs-extra@9.0.1',
  'chalk@4.1.0',
  // * --
  '@babel/preset-env@7.12.1',
  // * --
  // * Testing
  'ava@3.13.0',
  '@babel/register@7.12.1',
  '@babel/core@7.12.3',
  // * --
  // * Other
  'nano-panel@0.0.4',
  'plop@2.7.4',
  'muncher@0.0.13',
  '@babel/preset-typescript@7.12.1',
  '@types/node@14.14.6',
  '@types/lodash@4.14.165',
  '@types/howler@2.2.1',
  '@types/mainloop.js@1.0.5',
  '@types/mousetrap@1.6.4',
  // * Web - Labs and Debug tools
  'react@17.0.1',
  'react-dom@17.0.1',
  'styled-components@5.2.1',
  '@types/react@16.9.55',
  '@types/react-dom@16.9.9',
  '@types/styled-components@5.1.4',
  'eslint-config-xo-react@0.23.0',
  'eslint-plugin-react@7.21.5',
  'eslint-plugin-react-hooks@4.2.0',
]

module.exports = ({ projectName }) => {
  const rootPath = path.resolve(projectName)

  console.log(` Creating a new web game in ${chalk.green(rootPath)}`)
  console.log()

  const command = 'yarn'
  const yarnAdd = ['add', '--exact']

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
          source: 'storage.template.ts',
          destination: path.join(rootPath, 'src/util/storage.ts'),
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
      title: 'Install dev dependencies',
      task: () => {
        const devArgs = yarnAdd.concat('--dev').concat(devDependencies)

        return execa(command, devArgs, { all: true }).all
      },
    },
    {
      title: 'Install dependencies',
      task: () => {
        const productionArgs = yarnAdd.concat(dependencies)

        return execa(command, productionArgs, { all: true }).all
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
