import { expect, test } from 'vitest'
import { execa } from 'execa'
import { temporaryDirectory } from 'tempy'
import { getBinPath } from 'get-bin-path'

test('createAlchemyGame', async () => {
  const binPath = await getBinPath()
  if (!binPath) {
    throw new Error('No binPath found')
  }
  const directory = temporaryDirectory({ prefix: 'hello-world' })
  // @ts-expect-error - TODO
  const { stdout } = await execa(binPath, ['create', 'test-game'], {
    cwd: directory,
    env: {
      FORCE_COLOR: 2,
    },
  })

  // const generatedTsConfig = await loadJsonFile(
  //   path.join(directory, 'tsconfig.json'),
  // )

  // TODO: Expect package.json
  // TODO: Expect project folder
  console.log('stdout', stdout)
  // This won't work because the project will be created in a new temporary dir every time
  expect(stdout).toMatchSnapshot()
}, 30000)
