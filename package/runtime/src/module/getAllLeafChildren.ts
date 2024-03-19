import { Container } from 'pixi.js'

export default function getAllLeafChildren(container: Container): Container[] {
  const result = container.children.flatMap((child) =>
    getAllLeafChildren(child as Container),
  )

  if (container.children.length === 0) {
    return result.concat(container)
  }

  return result
}
