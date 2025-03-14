import { test, expect, vi } from 'vitest'

import createTimer from '../../src/runtime/internal/timer.js'
import { willTick } from '../util.js'

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

// Canceling a delay might not actually have any real world use cases, might remove in the future
test('delay - cancel', async () => {
  let done = false
  const { delay, debug } = createTimer()

  expect(debug().timers.length).toBe(0)
  expect(done).toBe(false)
  const promise = delay(3)
  expect(debug().timers.length).toBe(1)
  promise.cancel()
  expect(debug().timers.length).toBe(0)
  done = true
  expect(done).toBe(true)
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

test('repeatUntil - cancel', async () => {
  const { repeatUntil, debug } = createTimer()

  const callback = vi.fn(() => {})
  expect(debug().timers.length).toBe(0)
  const promise = repeatUntil(3, callback)
  expect(debug().timers.length).toBe(1)
  promise.cancel()
  expect(debug().timers.length).toBe(0)
  expect(callback).toHaveBeenCalledTimes(0)
})

test('repeatEvery', async () => {
  const { update, repeatEvery, debug } = createTimer()
  // Add no-op timer to ensure removal logic works
  repeatEvery(10, () => {})
  expect(debug().timers.length).toBe(1)

  const deltaTime = 1
  const callback = vi.fn((time, deltaTime) => {
    // Use time === 2 to only test this once
    if (time === 2) {
      expect(deltaTime).toBe(1)
    }
  })
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

test('repeatEvery - deltaTime greater than duration should still trigger', async () => {
  const { update, repeatEvery } = createTimer()

  const callback = vi.fn(() => {})
  repeatEvery(3, callback)

  await update(4)
  expect(callback).toBeCalledTimes(1)

  await update(1)
  expect(callback).toBeCalledTimes(1)

  await update(2)
  expect(callback).toBeCalledTimes(2)
})

test('repeatEvery - variable deltaTime', async () => {
  const { update, repeatEvery } = createTimer()

  let _deltaTime
  const callback = vi.fn((_time, deltaTime) => {
    console.log(' callback ~ deltaTime:', deltaTime)
    _deltaTime = deltaTime
  })

  repeatEvery(10, callback)

  await update(3)
  await update(7)

  expect(_deltaTime).toBe(5)
})
