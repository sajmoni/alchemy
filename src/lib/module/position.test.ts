import { expect, test } from 'vitest'

import { screenToWorldPixelPosition } from './position'

const getWorldPosition = screenToWorldPixelPosition({
  screenWidth: 100,
  screenHeight: 100,
})

test('screenToWorldPixelPosition', () => {
  const result = getWorldPosition({
    cameraCenterPosition: { x: 0, y: 0 },
    screenPosition: { x: 0, y: 0 },
  })

  const expected = { x: -50, y: -50 }

  expect(result).toEqual(expected)
})

test('screenToWorldPixelPosition - 2', () => {
  const result = getWorldPosition({
    cameraCenterPosition: { x: 1000, y: 1000 },
    screenPosition: { x: 50, y: 50 },
  })

  const expected = { x: 1000, y: 1000 }

  expect(result).toEqual(expected)
})

test('screenToWorldPixelPosition - 2', () => {
  const result = getWorldPosition({
    cameraCenterPosition: { x: 1000, y: 1000 },
    screenPosition: { x: 0, y: 0 },
  })

  const expected = { x: 950, y: 950 }

  expect(result).toEqual(expected)
})

test('screenToWorldPixelPosition - 2', () => {
  const result = getWorldPosition({
    cameraCenterPosition: { x: -1000, y: -1000 },
    screenPosition: { x: 0, y: 0 },
  })

  const expected = { x: -1050, y: -1050 }

  expect(result).toEqual(expected)
})
