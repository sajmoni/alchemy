import { describe, expect, test } from 'vitest'

import animate from '../../src/runtime/internal/animate.js'
import createTimer from '../../src/runtime/internal/timer.js'
import { willTick } from '../util.js'

describe('animate', () => {
  // TODO: Add tests for all animate functions
  test('linear', async () => {
    const timer = createTimer()
    const duration = 4
    willTick(duration, timer.update)

    const animateInstance = animate(timer)

    let returnValues: number[] = []
    await animateInstance.linear({
      duration,
      startValue: 1,
      endValue: 9,
      onUpdate: (value) => {
        returnValues.push(value)
      },
    })

    expect(returnValues).toEqual([3, 5, 7, 9])
  })
})
