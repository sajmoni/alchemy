import path from 'node:path'
import { fileURLToPath } from 'node:url'

import fs from 'fs-extra'
import chalk from 'chalk'
import { execa } from 'execa'
import { Listr } from 'listr2'
import { readPackage } from 'read-pkg'
import sortPackageJson from 'sort-package-json'
import { writePackage } from 'write-pkg'
import gradient from 'gradient-string'

const dependencies = ['pixi.js', 'vite', 'alchemy-engine']

export default function createAlchemyProject(gameName: string) {
  const rootPath = path.resolve(gameName)

  console.log()
  console.log(chalk.bold(gradient.passion(' ⚗️ Alchemy')))
  console.log()
  console.log(` Creating a new game in ${chalk.green(rootPath)}`)
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
        try {
          process.chdir(rootPath)
        } catch {
          throw new Error(`Could not change to project directory: ${rootPath}`)
        }
      },
    },
    {
      title: 'Git init',
      task: async () => {
        try {
          await execa('git', ['init'])
        } catch (error: any) {
          throw new Error(`Git repo not initialized: ${error.message}`)
        }
      },
    },
    {
      title: 'Setup TS project',
      task: async () => {
        await execa('npx', ['setup-ts-project', '--skip-commit'])
        await execa('npx', ['enable-absolute-paths'])
      },
    },
    {
      title: 'Setup package.json',
      task: async () => {
        const scripts = {
          dev: 'vite --open',
          build: 'vite build',
          preview: 'vite preview',
        }

        const packageJson = await readPackage({
          normalize: false,
        })

        const updatedPackageJson = sortPackageJson({
          ...packageJson,
          scripts: packageJson.scripts
            ? {
                ...packageJson.scripts,
                ...scripts,
              }
            : {
                ...scripts,
              },
        })

        // @ts-expect-error - sort-package-json doesn't return a compatible type
        await writePackage(updatedPackageJson)
      },
    },

    {
      title: 'Copy template files',
      task: () => {
        const __dirname = path.dirname(fileURLToPath(import.meta.url))
        const templateDirectory = path.join(__dirname, `../../../template`)

        try {
          fs.copySync(templateDirectory, rootPath)
        } catch (error: any) {
          throw new Error(`Could not copy template files: ${error.message}`)
        }
      },
    },
    {
      title: 'Install dependencies',
      task: async () => {
        const productionArgs = npmInstall.concat(dependencies)
        return execa(command, productionArgs, { all: true }).all
      },
    },
    {
      title: 'Git commit',
      task: async () => {
        try {
          await execa('git', ['add', '-A'])
          await execa('git', ['commit', '-m', 'Initialize Alchemy game'])
        } catch (error: any) {
          throw new Error(`Could not create commit ${error.message}`)
        }
      },
    },
  ])

  tasks
    .run()
    .then(() => {
      console.log(`
  ${chalk.green('Success!')} Created ${chalk.cyan(gameName)} at ${chalk.cyan(
        rootPath,
      )}

  Start the game by typing:

    ${chalk.cyan(`cd ${gameName}`)}
    ${chalk.cyan('npm run dev')}

  Good luck!
  `)
    })
    .catch((error: any) => {
      console.log()
      console.error(chalk.red(error))
      console.log()
      throw new Error(error)
    })
}