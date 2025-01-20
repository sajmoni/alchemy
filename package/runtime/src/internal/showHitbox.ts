import type { Container } from 'pixi.js'
import { graphics } from '../module/create'

function createShowEntityHitbox(container: Container) {
  const g = graphics(container)

  // @ts-expect-error - todo
  function render(e: Bounds) {
    g.rect(e.bounds.x, e.bounds.y, e.bounds.width, e.bounds.height)
    g.stroke({ color: '#dd2222', width: 1 })
  }

  // @ts-expect-error - todo
  return (entity: Bounds | Bounds[]) => {
    g.clear()
    if (Array.isArray(entity)) {
      for (const e of entity) {
        render(e)
      }
    } else {
      render(entity)
    }
  }
}

export default function createRenderHitbox() {
  return function renderHitbox() {}
}

export function showHitboxPrimitive<T extends object, K extends keyof T>(
  // TODO: Real type here
  subscribeKey: any,
  container: Container,
  proxyObject: T,
  key: K,
) {
  const showHitbox = createShowEntityHitbox(container)
  subscribeKey(proxyObject, key, showHitbox)
}

export function showHitboxObject(
  // TODO: Real type here
  subscribe: any,
  container: Container,
  // @ts-expect-error - todo
  proxyObject: Bounds | Bounds[],
) {
  const showHitbox = createShowEntityHitbox(container)
  subscribe(proxyObject, () => {
    showHitbox(proxyObject)
  })
}
