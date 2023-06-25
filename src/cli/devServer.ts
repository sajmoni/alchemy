import readline from 'node:readline'
import chokidar from 'chokidar'
import { createServer } from 'vite'

import loadSounds from './loadSounds.js'
import createSpriteSheet from './createSpriteSheet.js'

// Copied from the vite source code
export function clearScreen() {
  const repeatCount = process.stdout.rows - 2
  const blank = repeatCount > 0 ? '\n'.repeat(repeatCount) : ''
  console.log(blank)
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)
}

function handleSounds() {
  chokidar
    .watch('src/public/asset/sound', {
      ignoreInitial: true,
    })
    .on('all', (event) => {
      clearScreen()
      console.log(`${event}: Sound folder updated...`)
      loadSounds()
    })
  // TODO: Combine with glob
  chokidar
    .watch('src/public/asset/music', {
      ignoreInitial: true,
    })
    .on('all', (event) => {
      clearScreen()
      console.log(`${event}: Music folder updated...`)
      loadSounds()
    })
}

function handleSprites() {
  chokidar
    .watch('sprite', {
      ignoreInitial: true,
    })
    .on('all', (event) => {
      clearScreen()
      console.log(`${event}: Sprites updated...`)
      createSpriteSheet()
    })
}

export default async function devServer() {
  clearScreen()
  console.log('Starting alchemy dev server...')

  const server = await createServer({
    configFile: 'vite.config.ts',
    server: {
      open: true,
      port: 1337,
    },
  })

  await server.listen()

  server.printUrls()

  handleSounds()
  handleSprites()
}
