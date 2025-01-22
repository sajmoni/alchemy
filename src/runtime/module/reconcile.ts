import { differenceWith, isDeepEqual } from 'remeda'
import { removeFromList } from 'tiny-toolkit'

export type Arguments<T> = {
  onAdd: (item: T) => void
  onRemove: (item: T) => void
  onChange?: ((item: T) => void) | undefined
}

// TODO: Replace this with a library, mobx?

/**
 * Run functions when an item is added, removed or changed in a list or map
 *
 * Returns a function that should be called whenever you want the list or map to be re-evaluated
 */
export default function createReconciledList<
  T extends { id: number | string },
>({ onAdd, onRemove, onChange }: Arguments<T>) {
  let previousData: T[] = []
  return (list: T[] | Map<string | number, T>) => {
    const useList = () => {
      if (Array.isArray(list)) {
        return list
      }
      return Array.from(list, ([, value]) => value)
    }

    const listToUse = useList()

    const data = {
      added: [] as T[],
      removed: [] as T[],
      // Have neither been added nor removed
      remainders: [] as T[],
    }

    for (const item of listToUse) {
      // If it doesn't exist in previousData, it's added
      if (previousData.every((pd) => pd.id !== item.id)) {
        data.added.push(item)
      } else {
        data.remainders.push(item)
      }
    }

    for (const item of previousData) {
      // If it doesn't exist in list, it's removed
      if (listToUse.every((pd) => pd.id !== item.id)) {
        data.removed.push(item)
        removeFromList(item, data.remainders)
      }
    }

    if (onChange) {
      // If it exists in both lists, but have changed, it's changed
      const changed = differenceWith(data.remainders, previousData, (a, b) => {
        return isDeepEqual(a, b)
      })

      for (const c of changed) {
        onChange(c)
      }
    }

    for (const a of data.added) {
      onAdd(a)
    }
    for (const r of data.removed) {
      onRemove(r)
    }

    previousData = [...listToUse]
  }
}
