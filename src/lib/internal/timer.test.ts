import { test, expect, vi } from 'vitest'

import { willTick } from './test/util'
import createTimer from './timer'

test('delay', async () => {
  let done = false
  const { update, delay, debug } = createTimer()
  willTick(3, update)

  expect(debug().timers.length).toBe(0)
  expect(done).toBe(false)
  await delay(3)
  expect(debug().timers.length).toBe(0)
  done = true
  expect(done).toBe(true)
})

test('delay - cancel', () => {
  // TODO: Cancel
})

test('repeatUntil', async () => {
  const { update, repeatUntil, debug } = createTimer()
  willTick(3, update)

  const callback = vi.fn((time, deltaTime) => {
    // Use time === 1 to only test this once
    if (time === 1) {
      expect(deltaTime).toBe(1)
      expect(debug().timers.length).toBe(1)
    }
  })
  expect(debug().timers.length).toBe(0)
  await repeatUntil(3, callback)
  expect(debug().timers.length).toBe(0)
  expect(callback).toHaveBeenCalledTimes(3)
})

test('repeatUntil - cancel', () => {
  // TODO
})

test('repeatEvery', async () => {
  const { update, repeatEvery, debug } = createTimer()
  // Add no-op timer to ensure removal logic works
  repeatEvery(10, () => {})

  const deltaTime = 1

  const callback = vi.fn((time, deltaTime) => {
    // Use time === 2 to only test this once
    if (time === 2) {
      expect(deltaTime).toBe(1)
    }
  })
  expect(debug().timers.length).toBe(1)
  const cancel = repeatEvery(2, callback)
  expect(debug().timers.length).toBe(2)
  await update(deltaTime)
  await update(deltaTime)
  expect(callback).toHaveBeenCalledTimes(1)
  await update(deltaTime)
  await update(deltaTime)
  expect(callback).toHaveBeenCalledTimes(2)
  cancel()
  expect(debug().timers.length).toBe(1)
  await update(deltaTime)
  await update(deltaTime)
  // After cancel the callback will not be called again
  expect(callback).toHaveBeenCalledTimes(2)
})
