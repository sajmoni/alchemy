import { setTimeout } from 'node:timers/promises'

import { Sprite } from 'pixi.js'
import { createObjectPool } from 'nano-pool'
import { test, expect, vi } from 'vitest'
import { proxy } from 'valtio'

import { reconcileSprites } from '../../src/runtime/index.js'

test('reconcileSprites', async () => {
  const firstItem = { id: '1', value: 0 }
  const list = proxy([firstItem])
  const pool = createObjectPool(10, () => {
    return new Sprite()
  })
  const onChange = vi.fn(() => {})
  const onAdd = vi.fn(() => {})
  const onRemove = vi.fn(() => {})

  reconcileSprites({ list, pool, onAdd, onRemove, onChange })
  await setTimeout(0)
  // @ts-expect-error
  expect(onAdd.mock.calls[0][0]).toEqual(firstItem)
  const secondItem = { id: '2', value: 0 }
  list.push(secondItem)
  await setTimeout(0)
  // @ts-expect-error
  expect(onAdd.mock.calls[1][0]).toEqual({ id: '2', value: 0 })
  expect(onRemove).toHaveBeenCalledTimes(0)
  expect(onChange).toHaveBeenCalledTimes(0)
  const index = list.findIndex((item) => item.id === '1')
  list.splice(index, 1)
  await setTimeout(0)
  // @ts-expect-error
  expect(onRemove.mock.calls[0][0]).toEqual(firstItem)
  // @ts-expect-error
  list[0].value = 1
  await setTimeout(0)
  // @ts-expect-error
  expect(onChange.mock.calls[0][0]).toEqual({ id: '2', value: 1 })
})
