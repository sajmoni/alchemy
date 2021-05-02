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

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / k ** i).toFixed(dm)) + ' ' + sizes[i]
}

const calculateSize = (path) => {
  if (fs.lstatSync(path).isFile()) {
    return fs.statSync(path).size
  }

  if (fs.lstatSync(path).isDirectory()) {
    // eslint-disable-next-line unicorn/no-array-reduce
    return fs.readdirSync(path).reduce((total, localPath) => {
      return total + calculateSize(`${path}/${localPath}`)
    }, 0)
  }

  throw new Error('Error when calculating game size')
}

const run = async () => {
  try {
    await build(buildOptions)
    await Promise.all([
      fs.copy('public/asset', `${buildOptions.outdir}/asset`),
      fs.copy('public/index.html', `${buildOptions.outdir}/index.html`),
    ])

    const size = calculateSize(buildOptions.outdir)

    console.log()
    console.log(chalk.green(`   Success!`))
    console.log()
    console.log(`   Built to ${chalk.cyan(buildOptions.outdir)}`)
    console.log()
    console.log(`   ${chalk.gray(`Game size:`)} ${formatBytes(size)}`)
    console.log()
  } catch (error) {
    console.log(chalk.red(`Could not copy public files: ${error}`))
    process.exit(1)
  }
}

run()
