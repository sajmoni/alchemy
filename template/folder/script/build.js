const { build } = require('esbuild')
const fs = require('fs-extra')

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
  entryPoints: ['src/index.ts'],
  bundle: true,
  outdir: 'dist',
  define,
  loader: {
    '.wav': 'file',
  },
}

build(buildOptions).catch(() => process.exit(1))

try {
  fs.copySync('public', buildOptions.outdir)

  console.log(`Success! Build to ${buildOptions.outdir}`)
} catch (error) {
  throw new Error(`Could not copy public files: ${error}`)
}
