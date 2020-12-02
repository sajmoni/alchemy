const { serve } = require('esbuild')
const handler = require('serve-handler')
const http = require('http')

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

const serveOptions = {
  port: 8000,
  onRequest: () => {
    console.log('Rebuilding')
  },
}

const directoryToServe = process.argv[2]
const bundleEntryPoint = process.argv[3]

if (!directoryToServe) {
  throw new Error('serve requires the directory to serve as an argument')
}

if (!bundleEntryPoint) {
  throw new Error(
    'serve requires the bundle entry point as the second argument',
  )
}

console.log(`Serving directory: ${directoryToServe}`)
console.log(`Bundling directory: ${bundleEntryPoint}`)

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
    console.error('serve crash:', error)
    process.exit(1)
  })
  console.log(
    ` esbuild serving javascript on http://${serveResult.host}:${serveResult.port}`,
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
  console.log(' Running at http://localhost:3000')
})
