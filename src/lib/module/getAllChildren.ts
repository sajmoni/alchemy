import { Container } from 'pixi.js'

export default function getAllChildren(container: Container): Container[] {
  return container.children
    .flatMap((child) => getAllChildren(child as Container))
    .concat(container)
}
