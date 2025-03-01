import { mkdir, readFile, cp } from 'node:fs/promises'
import path from 'node:path'

import { expect, test } from 'vitest'
import { execa } from 'execa'
import { temporaryDirectory } from 'tempy'
import { getBinPath } from 'get-bin-path'

import { SPRITESHEET_FOLDER_PATH } from '../../src/cli/generateSpriteSheet.js'

test('sprites', async () => {
  const binPath = await getBinPath()
  if (!binPath) {
    throw new Error('No binPath found')
  }

  const directory = temporaryDirectory({ prefix: 'hello-world' })

  await mkdir(path.join(directory, 'sprite'))
  await mkdir(path.join(directory, SPRITESHEET_FOLDER_PATH), {
    recursive: true,
  })
  await cp(
    path.join('./square.ase'),
    path.join(directory, './sprite/square.ase'),
  )

  // @ts-expect-error - TODO
  const { stdout } = await execa(binPath, ['sprite'], {
    cwd: directory,
    env: {
      FORCE_COLOR: 2,
    },
  })

  console.log('stdout', stdout)

  const spritesheetRaw = await readFile(
    path.join(directory, 'src/public/asset/spritesheet/data.json'),
  )
  const spritesheet = JSON.parse(spritesheetRaw.toString())
  expect(Object.keys(spritesheet.frames)[0]).toEqual('square-1')
})
