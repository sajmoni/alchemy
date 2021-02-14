#!/usr/bin/env node

const { serve, build } = require('esbuild')
const chalk = require('chalk')

const directoryToServe = process.argv[2]
const bundleEntryPoint = process.argv[3]

if (!directoryToServe) {
  console.log(chalk.red('serve requires the directory to serve as an argument'))
  process.exit(1)
}

if (!bundleEntryPoint) {
  console.log(
    chalk.red('serve requires the bundle entry point as the second argument'),
  )
  process.exit(1)
}

const serveOptions = {
  port: 8000,
  servedir: directoryToServe,
  onRequest: () => {
    // Might be able to change this once web workers are supported in esbuild
    build({
      entryPoints: ['src/worker/index.ts'],
      bundle: true,
      outfile: `${directoryToServe}/worker/index.js`,
    })
  },
}

const buildOptions = {
  entryPoints: [bundleEntryPoint],
  bundle: true,
  incremental: true,
  outdir: directoryToServe,
  define: {
    'process.env.NODE_ENV': '"development"',
  },
  loader: {
    '.wav': 'file',
  },
}

const serveEsbuild = async () => {
  const serveResult = await serve(serveOptions, buildOptions).catch((error) => {
    console.log(chalk.red(`serve crash: ${error}`))
    process.exit(1)
  })
  const esbuildUrl = `http://${serveResult.host}:${serveResult.port}`
  console.log(
    `${chalk.green(`   Dev server started at `)}${chalk.cyan(
      chalk.cyan(esbuildUrl),
    )}`,
  )
  console.log()
  await serveResult.wait
  serveResult.stop()
}

serveEsbuild()

console.log()
console.log(`   Serving directory: ${chalk.cyan(directoryToServe)}`)
console.log(`   Bundle entry point: ${chalk.cyan(bundleEntryPoint)}`)
console.log()
