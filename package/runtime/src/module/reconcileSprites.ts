import { type Container, Texture } from 'pixi.js'
import { snapshot, subscribe } from 'valtio'
import type { ObjectPool } from 'nano-pool'

import { isAnimatedSprite } from './pixiTypeGuard'
import createReconciledList from './reconcile'

/**
 * Automatically get and release sprites from a pool whenever a list or map of objects change
 */
export function reconcileSprites<
  Item extends { id: string | number },
  PixiType extends Container,
>({
  /**
   * Has to be a Proxy
   */
  list,
  pool,
  /**
   * Called whenever an item is added to the list
   */
  onAdd,
  /**
   * Called whenever an item is removed from the list
   */
  onRemove,
  /**
   * Called whenever an item in the list changes
   */
  onChange,
}: {
  list: Item[]
  pool: ObjectPool<PixiType>
  onAdd: (item: Item, sprite: PixiType) => void
  onRemove?: (item: Item, sprite: PixiType) => void
  onChange?: (item: Item, sprite: PixiType) => void
}) {
  const pixiMap = new Map<string | number, PixiType>()
  const reconcile = createReconciledList<Item>({
    onAdd(item) {
      const sprite = pool.get()
      pixiMap.set(item.id, sprite)
      sprite.visible = true
      onAdd(item, sprite)
    },
    onRemove(item) {
      const sprite = pixiMap.get(item.id)
      if (!sprite) {
        throw new Error(
          `reconcileSprites: onRemove, no pixi object found for ${item.id}`,
        )
      }
      pool.release(sprite)
      pixiMap.delete(item.id)

      sprite.visible = false
      if (isAnimatedSprite(sprite)) {
        sprite.textures = [Texture.EMPTY]
      }

      if (onRemove) {
        onRemove(item, sprite)
      }
    },
    onChange:
      onChange ?
        function (item) {
          const sprite = pixiMap.get(item.id)
          if (!sprite) {
            throw new Error(
              `reconcileSprites: onChange, no pixi object found for ${item.id}`,
            )
          }
          onChange(item, sprite)
        }
      : undefined,
  })

  reconcile(list)
  subscribe(list, () => {
    // Using snapshot here so that onChange is detected properly
    // TODO: This shouldn't be needed though and also performance might suffer
    // @ts-expect-error
    reconcile(snapshot(list))
  })
}
