import type { Container, FederatedPointerEvent } from 'pixi.js'

export const onClick = (
  container: Container,
  callback: (event: FederatedPointerEvent) => void,
): void => {
  container.eventMode = 'static'
  container.cursor = 'pointer'

  container.onpointerdown = (event) => {
    callback(event)
  }
}

export const onHover = (
  container: Container,
  options: { onOver?: () => void; onOut?: () => void },
) => {
  const { onOver, onOut } = options

  container.eventMode = 'static'

  container.on('pointerover', () => {
    if (onOver) {
      onOver()
    }
  })

  container.on('pointerout', () => {
    if (onOut) {
      onOut()
    }
  })
}
