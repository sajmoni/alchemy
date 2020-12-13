const { build } = require('esbuild')
const fs = require('fs-extra')
const chalk = require('chalk')

// TODO: Use dotenv to read env?
const env = {
  NODE_ENV: 'production',
  // TODO: Decide what do to with VERSION
  VERSION: 1,
  DEBUG: true,
}
// TODO: Typesafety for process.env
// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript

const define = Object.fromEntries(
  Object.entries(env).map(([key, value]) => {
    return [`process.env.${key}`, JSON.stringify(value)]
  }),
)

const buildOptions = {
  entryPoints: ['src/index.ts', 'src/worker/index.ts'],
  bundle: true,
  outdir: 'build',
  define,
  loader: {
    '.wav': 'file',
  },
}

const run = async () => {
  try {
    await build(buildOptions)
    fs.copySync('public/asset', `${buildOptions.outdir}/asset`)
  
    console.log()
    console.log(chalk.green(`   Success!`))
    console.log(`   Built to ${chalk.cyan(buildOptions.outdir)}`)
    console.log()
  } catch (error) {
    console.log(chalk.red(`Could not copy public files: ${error}`))
    process.exit(1)
  }
}

run()
