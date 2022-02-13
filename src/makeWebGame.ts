import path from 'node:path'
import os from 'node:os'
import process from 'node:process'
import chalk from 'chalk'
import fs from 'fs-extra'
import execa from 'execa'
// @ts-expect-error Will switch to listr2
import Listr from 'listr'

import getPackageJsonTemplate from './getPackageJsonTemplate'
import createFileFromTemplate from './createFileFromTemplate'
import displayDoneMessage from './message/done'

const dependencies = [
  // Rendering
  'pixi.js@6.2.1',
  'pixi-ex@0.2.0',
  '@pixi/particle-emitter@5.0.2',
  // Sound
  'howler@2.2.3',
  // Game logic
  'juice.js@2.0.2',
  'l1@0.8.0',
  'mainloop.js@1.0.4',
  'valtio@1.2.7',
  'tinykeys@1.3.0',
  // Utils
  'tiny-toolkit@0.1.0',
  'math-avg@2.0.0',
  'round-to@6.0.0',
  // Monitoring
  '@sentry/browser@6.11.0',
  '@sentry/tracing@6.11.0',
]

const devDependencies = [
  // Code quality
  'xo@0.47.0',
  'typescript@4.5.4',
  'husky@4.3.6',
  'lint-staged@10.5.4',
  // Module bundling
  'vite@2.7.6',
  // Testing
  'ava@3.15.0',
  'esbuild-runner@2.2.1',
  // Other
  'nano-panel@0.0.10',
  'plop@2.7.4',
  'fs-extra@10.0.0',
  // Types
  '@types/node@14.14.34',
  '@types/howler@2.2.3',
  '@types/mainloop.js@1.0.5',
  // Web - Labs and Debug tools
  'react@17.0.2',
  'react-dom@17.0.2',
  'styled-components@5.3.3',
  '@types/react@17.0.3',
  '@types/react-dom@17.0.2',
  '@types/styled-components@5.1.8',
]

const makeWebGame = ({ projectName }: { projectName: string }) => {
  const rootPath = path.resolve(projectName)

  console.log(` Creating a new web game in ${chalk.green(rootPath)}`)
  console.log()

  const command = 'npm'
  const npmInstall = ['install', '--save-exact']

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
      },
    },
    {
      title: 'Git init',
      task: () => {
        try {
          // Change directory so that Husky gets installed in the right .git folder
          process.chdir(rootPath)
        } catch {
          throw new Error(`Could not change to project directory: ${rootPath}`)
        }

        try {
          execa.sync('git', ['init', '-b', 'main'])
        } catch (error: any) {
          throw new Error(`Git repo not initialized: ${error.message}`)
        }
      },
    },
    {
      title: 'Copy template files',
      task: () => {
        const templateDirectory = path.join(__dirname, `/../template`)

        try {
          fs.copySync(`${templateDirectory}/folder`, rootPath)
        } catch (error: any) {
          throw new Error(`Could not copy template files: ${error.message}`)
        }

        createFileFromTemplate({
          source: `${templateDirectory}/README.template.md`,
          destination: path.join(rootPath, 'README.md'),
          options: { projectName },
        })

        fs.moveSync(path.join(rootPath, 'npmrc'), path.join(rootPath, '.npmrc'))

        fs.moveSync(
          path.join(rootPath, 'gitignore'),
          path.join(rootPath, '.gitignore'),
        )
      },
    },
    {
      title: 'Install dev dependencies',
      task: () => {
        const devArgs = npmInstall.concat('--save-dev').concat(devDependencies)

        return execa(command, devArgs, { all: true }).all
      },
    },
    {
      title: 'Install dependencies',
      task: () => {
        const productionArgs = npmInstall.concat(dependencies)

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
        } catch (error: any) {
          // It was not possible to commit.
          // Maybe the commit author config is not set.
          // Remove the Git files to avoid a half-done state.
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
    .catch((error: any) => {
      console.log()
      console.error(chalk.red(error))
      console.log()
      throw new Error(error)
    })
}

export default makeWebGame
