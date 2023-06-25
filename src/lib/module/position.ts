import type { Position } from '../type'

// TODO: Include only the second part of this as a scene export
export const screenToWorldPixelPosition =
  ({
    screenWidth,
    screenHeight,
  }: {
    screenWidth: number
    screenHeight: number
  }) =>
  ({
    cameraCenterPosition,
    screenPosition,
  }: {
    cameraCenterPosition: Position
    screenPosition: Position
  }): Position => {
    const worldPixelPosition = {
      x: cameraCenterPosition.x - screenWidth / 2 + screenPosition.x,
      y: cameraCenterPosition.y - screenHeight / 2 + screenPosition.y,
    }

    return worldPixelPosition
  }

export const worldToScreenPixelPosition =
  ({ viewWidth, viewHeight }: { viewWidth: number; viewHeight: number }) =>
  ({
    position,
    worldPosition,
  }: {
    position: Position
    worldPosition: Position
  }): Position => {
    const screenPixelPosition = {
      x: worldPosition.x - position.x + viewWidth / 2,
      y: worldPosition.y - position.y + viewHeight / 2,
    }

    return screenPixelPosition
  }
