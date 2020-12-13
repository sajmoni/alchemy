const { serve, build } = require('esbuild')
const handler = require('serve-handler')
const http = require('http')
const chalk = require('chalk')

// TODO: Use dotenv to read env?
const env = {
  NODE_ENV: 'development',
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

const directoryToServe = process.argv[2]
const bundleEntryPoint = process.argv[3]

if (!directoryToServe) {
  console.log(chalk.red('serve requires the directory to serve as an argument'))
  process.exit(1)
}

if (!bundleEntryPoint) {
  console.log(chalk.red('serve requires the bundle entry point as the second argument'))
  process.exit(1)
}

const serveOptions = {
  port: 8000,
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
  define,
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
    `   esbuild serving javascript on ${chalk.cyan(esbuildUrl)}`,
  )
  await serveResult.wait
  serveResult.stop()
}

const server = http.createServer((request, response) => {
  return handler(request, response, { public: directoryToServe })
})

serveEsbuild()

server.listen(3000, () => {
  console.log()
  console.log(chalk.green(`   Dev server started!`))
  console.log()
  console.log(`   Serving directory: ${chalk.cyan(directoryToServe)}`)
  console.log(`   Bundle entry point: ${chalk.cyan(bundleEntryPoint)}`)
  console.log()
  console.log(`   Running at ${chalk.cyan('http://localhost:3000')}`)
  console.log()
})
