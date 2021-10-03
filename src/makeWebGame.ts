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
  'pixi.js@6.1.3',
  'pixi-ex@0.1.0',
  '@pixi/particle-emitter@5.0.2',
  // Sound
  'howler@2.2.3',
  // Game logic
  'juice.js@2.0.2',
  'l1@0.7.1',
  'mainloop.js@1.0.4',
  'valtio@1.2.4',
  'tiny-toolkit@0.0.10',
  'tinykeys@1.2.0',
  'dot-prop@6.0.1',
  // Monitoring
  '@sentry/browser@6.11.0',
  '@sentry/tracing@6.11.0',
]

const devDependencies = [
  // Code quality
  'xo@0.39.1',
  'typescript@4.4.3',
  'husky@4.3.6',
  'lint-staged@10.5.4',
  'eslint-plugin-fp@2.3.0',
  // Module bundling
  'vite@2.6.2',
  // Testing
  'ava@3.15.0',
  'esbuild-runner@2.2.1',
  // Other
  'nano-panel@0.0.10',
  'plop@2.7.4',
  // Types
  '@types/node@14.14.34',
  '@types/howler@2.2.3',
  '@types/mainloop.js@1.0.5',
  // Web - Labs and Debug tools
  'react@17.0.2',
  'react-dom@17.0.2',
  'styled-components@5.3.1',
  '@types/react@17.0.3',
  '@types/react-dom@17.0.2',
  '@types/styled-components@5.1.8',
  'eslint-config-xo-react@0.25.0',
  'eslint-plugin-react@7.23.2',
  'eslint-plugin-react-hooks@4.2.0',
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
        return true
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

          return true
        } catch (error: any) {
          throw new Error(`Git repo not initialized ${error}`)
        }
      },
    },
    {
      title: 'Copy template files',
      task: () => {
        const templateDirectory = path.join(__dirname, `/../template`)

        try {
          fs.copySync(`${templateDirectory}/folder`, rootPath)
        } catch (error) {
          throw new Error(`Could not copy template files: ${error}`)
        }

        createFileFromTemplate({
          source: `${templateDirectory}/storage.template.ts`,
          destination: path.join(rootPath, 'src/util/storage.ts'),
          options: { projectName },
        })

        // Rename gitignore to prevent npm from renaming it to .npmignore
        // See: https://github.com/npm/npm/issues/1862
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

          return true
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
