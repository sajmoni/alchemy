import { describe, test, expect, vi } from 'vitest'
import createReconciledList from './reconcile'

describe('reconcile', () => {
  test('reconcile', () => {
    type Item = { id: string; iteration: number }
    const list = new Map<string, Item>()
    list.set('1', { id: '1', iteration: 1 })

    const onChange = vi.fn(() => {})
    const onAdd = vi.fn(() => {})
    const onRemove = vi.fn(() => {})
    const reconcile = createReconciledList<Item>({
      onAdd,
      onRemove,
      onChange,
    })

    reconcile(list)
    expect(onAdd).toHaveBeenCalledWith({ id: '1', iteration: 1 })
    expect(onRemove).toHaveBeenCalledTimes(0)
    expect(onChange).toHaveBeenCalledTimes(0)

    const updatedList = list.set('1', { id: '1', iteration: 2 })
    reconcile(updatedList)
    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledTimes(0)
    expect(onChange).toHaveBeenCalledWith({ id: '1', iteration: 2 })

    updatedList.delete('1')
    reconcile(updatedList)
    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onRemove).toHaveBeenCalledWith({ id: '1', iteration: 2 })
    expect(onChange).toHaveBeenCalledTimes(1)
  })
})
