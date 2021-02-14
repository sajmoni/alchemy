#!/usr/bin/env node

const { build } = require('esbuild')
const fs = require('fs-extra')
const chalk = require('chalk')

const buildOptions = {
  entryPoints: ['src/index.ts', 'src/worker/index.ts'],
  bundle: true,
  outdir: 'build',
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  loader: {
    '.wav': 'file',
  },
}

const run = async () => {
  try {
    await build(buildOptions)
    await Promise.all([
      fs.copy(
        'public/asset',
        `${buildOptions.outdir}/asset
      `,
      ),
      fs.copy('public/index.html', `${buildOptions.outdir}/index.html`),
    ])

    console.log()
    console.log(chalk.green(`   Success!`))
    console.log()
    console.log(`   Built to ${chalk.cyan(buildOptions.outdir)}`)
    console.log()
  } catch (error) {
    console.log(chalk.red(`Could not copy public files: ${error}`))
    process.exit(1)
  }
}

run()
