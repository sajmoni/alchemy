import { test, expect, vi } from 'vitest'

import initializeKeyboardInput from '../../src/runtime/internal/input'
import createTimer from '../../src/runtime/internal/timer'

test('debouncedKey', async () => {
  const key = 'a'
  const timer = createTimer()
  const input = initializeKeyboardInput([key], timer)

  const callback = vi.fn(() => {})
  input.debouncedKey(key, callback, 2)
  window.dispatchEvent(new KeyboardEvent('keydown', { key }))

  expect(callback).toHaveBeenCalledTimes(0)
  await timer.update(1)
  expect(callback).toHaveBeenCalledTimes(0)
  await timer.update(1)
  expect(callback).toHaveBeenCalledTimes(0)
  await timer.update(1)
  expect(callback).toHaveBeenCalledTimes(1)
  await timer.update(1)
  expect(callback).toHaveBeenCalledTimes(1)
  await timer.update(1)
  expect(callback).toHaveBeenCalledTimes(2)
  await timer.update(1)
  expect(callback).toHaveBeenCalledTimes(2)
  await timer.update(1)
  expect(callback).toHaveBeenCalledTimes(3)
})

test('isKeyDown', () => {
  const key = 'a'
  const timer = createTimer()
  const input = initializeKeyboardInput([key, 'b', 'c'] as const, timer)
  window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  expect(input.isKeyDown(key)).toBe(true)
})
