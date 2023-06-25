import type { DisplayObject, FederatedPointerEvent } from 'pixi.js'

export const onClick = (
  displayObject: DisplayObject,
  callback: (event: FederatedPointerEvent) => void,
): void => {
  displayObject.eventMode = 'static'
  displayObject.cursor = 'pointer'

  displayObject.onpointerdown = (event) => {
    callback(event)
  }
}

export const onHover = (
  displayObject: DisplayObject,
  options: { onOver?: () => void; onOut?: () => void },
) => {
  const { onOver, onOut } = options

  displayObject.eventMode = 'static'

  displayObject.on('pointerover', () => {
    if (onOver) {
      onOver()
    }
  })

  displayObject.on('pointerout', () => {
    if (onOut) {
      onOut()
    }
  })
}
