import { expect, test } from 'vitest'
import { Texture } from 'pixi.js'

import { createGetTexturesInFolder } from '../../src/runtime/internal/getTexturesInFolder.js'

test('getTexturesInFolder', () => {
  const getTexturesInFolder = createGetTexturesInFolder({
    'hello/world': Texture.EMPTY,
    'world/hello': Texture.EMPTY,
    'not-included/in-result': Texture.EMPTY,
  })
  const result = getTexturesInFolder('hello')
  expect(result.length).toEqual(1)
})
