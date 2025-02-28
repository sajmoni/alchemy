import path from 'node:path'
import process from 'node:process'
import { styleText } from 'node:util'
import { cpSync } from 'node:fs'

import spawn from 'nano-spawn'
import { Listr } from 'listr2'
import { readPackage } from 'read-pkg'
import sortPackageJson from 'sort-package-json'
import { writePackage } from 'write-package'
import writePrettyFile from 'write-pretty-file'
import typescriptPkg from 'typescript'
const { findConfigFile, readConfigFile, sys } = typescriptPkg

const externalDependencies = ['pixi.js', 'vite']

const dependencies =
  process.env['MODE'] === 'development' ?
    [...externalDependencies, path.join(import.meta.dirname, `../../../`)]
  : [...externalDependencies, 'alchemy-engine']

const devDependencies = ['vitest']

export default function createAlchemyProject() {
  const rootPath = path.resolve()

  console.log()
  console.log(styleText('bold', styleText(['blue', 'bold'], ' ⚗️ Alchemy')))
  console.log()
  console.log(` Creating a new game in ${styleText('green', rootPath)}`)
  console.log()

  const command = 'npm'
  const npmInstall = ['install', '--save-exact']

  const tasks = new Listr([
    {
      title: 'Setup TS project',
      task: async () => {
        await spawn('npx', ['setup-ts-project@latest', '--skip-commit'])
        await spawn('npx', ['enable-absolute-paths@latest'])

        const tsconfigPath = findConfigFile(
          process.cwd(),
          sys.fileExists,
          'tsconfig.json',
        )

        if (!tsconfigPath) {
          throw new Error('No tsconfig path found!')
        }

        const tsconfig = readConfigFile(tsconfigPath, sys.readFile)

        if (tsconfig) {
          const { config } = tsconfig

          const updatedTsConfig = {
            ...config,
            compilerOptions: {
              ...config.compilerOptions,
              lib:
                config.compilerOptions?.lib ?
                  [...config.compilerOptions.lib, 'DOM', 'esnext']
                : ['DOM', 'esnext'],
              types:
                config.compilerOptions?.types ?
                  [...config.compilerOptions.types, 'vite/client']
                : ['vite/client'],
            },
          }
          await writePrettyFile(
            'tsconfig.json',
            JSON.stringify(updatedTsConfig),
          )
        } else {
          throw new Error('No tsconfig found')
        }
      },
    },
    {
      title: 'Setup package.json',
      task: async () => {
        const scripts = {
          dev: 'alchemy dev',
          build: 'vite build',
          preview: 'vite preview',
          test: 'vitest',
          'deploy:production': 'gh workflow run "Deploy to production"',
          'deploy:staging': 'gh workflow run "Deploy to staging"',
        }

        const packageJson = await readPackage({
          normalize: false,
        })

        const updatedPackageJson = sortPackageJson({
          ...packageJson,
          scripts:
            packageJson.scripts ?
              {
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
        const templateDirectory = path.join(
          import.meta.dirname,
          `../../../template`,
        )

        try {
          cpSync(templateDirectory, rootPath, { recursive: true })
        } catch (error: any) {
          throw new Error(`Could not copy template files: ${error.message}`)
        }
      },
    },
    {
      title: 'Install dependencies',
      task: async () => {
        const args = npmInstall
          .concat(dependencies)
          .concat('--legacy-peer-deps')
        return spawn(command, args)
      },
    },
    {
      title: 'Install dev dependencies',
      task: async () => {
        const args = npmInstall.concat(devDependencies).concat('--save-dev')
        return spawn(command, args)
      },
    },
    {
      title: 'Git commit',
      task: async () => {
        try {
          await spawn('git', ['add', '-A'])
          await spawn('git', ['commit', '-m', 'Initialize Alchemy game'])
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
  ${styleText('green', 'Successfully initialized Alchemy game!')}

  Start the game by running:

    ${styleText('cyan', 'npm run dev')}

  Good luck!
  `)
    })
    .catch((error: unknown) => {
      if (typeof error === 'string') {
        console.log()
        console.error(styleText('red', error))
        console.log()
      }
      throw new Error(error as any)
    })
}
