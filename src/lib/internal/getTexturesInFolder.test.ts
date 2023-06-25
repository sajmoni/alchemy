import { expect, test } from 'vitest'
import { createGetTexturesInFolder } from './getTexturesInFolder'
import { Texture } from 'pixi.js'

test('getTexturesInFolder', () => {
  const getTexturesInFolder = createGetTexturesInFolder({
    'hello/world': Texture.EMPTY,
    // TODO: Don't include this
    // 'world/hello': Texture.EMPTY,
    'not-included/in-result': Texture.EMPTY,
  })
  const result = getTexturesInFolder('hello')
  expect(result).toEqual([Texture.EMPTY])
})
