import type { Graphics, Rectangle } from 'pixi.js'

type Cell = {
  x: number
  y: number
  width: number
  height: number
}

export const getCells = ({
  width,
  height,
  numberOfCells,
}: {
  width: number
  height: number
  numberOfCells: number
}): Cell[] => {
  const cellWidth = width / numberOfCells
  const cellHeight = height / numberOfCells

  let cells = []
  for (let x = 0; x < numberOfCells; x++) {
    for (let y = 0; y < numberOfCells; y++) {
      cells.push({
        x: x * cellWidth,
        y: y * cellHeight,
        width: cellWidth,
        height: cellHeight,
      })
    }
  }

  return cells
}

export default function showGrid(
  screen: Rectangle,
  graphics: Graphics,
  numberOfCells = 2,
): void {
  const cells = getCells({
    width: screen.width,
    height: screen.height,
    numberOfCells,
  })

  for (const cell of cells) {
    const { x, y, width, height } = cell
    graphics.rect(x, y, width, height)
  }
}
