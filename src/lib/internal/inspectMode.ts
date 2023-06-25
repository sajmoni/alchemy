import { Application, Container, Graphics, Rectangle } from 'pixi.js'
import { graphics, text } from '../module/create'
import { onClick, onHover } from '../module/event'
import getAllLeafChildren from '../module/getAllLeafChildren'
import logObject from '../module/logObject'

export default function initializeInspectMode(app: Application) {
  app.stage.sortableChildren = true
  // Do this first to not include the debug items in the list
  const objects = getAllLeafChildren(app.stage)

  const hitboxGraphics = graphics(app.stage)
  hitboxGraphics.name = 'hitboxGraphics'
  hitboxGraphics.zIndex = 9999
  const strokeThickness = 2

  const hoverText = text(app.stage, {
    fontSize: 8,
    stroke: '#d53434',
    strokeThickness: 2,
  })
  hoverText.name = 'hoverText'
  hoverText.zIndex = 9999

  for (const object of objects) {
    onClick(object, () => {
      logObject(object)
    })
    onHover(object, {
      onOver: () => {
        hoverText.visible = true
        hoverText.text = object.name ?? '(No name)'

        const global = object.getGlobalPosition()
        hoverText.position.set(global.x, global.y)
        hitboxGraphics.lineStyle(strokeThickness, '#22ff22')
        drawHitbox(object, hitboxGraphics, strokeThickness)
      },
      onOut: () => {
        hoverText.visible = false
        hitboxGraphics.clear()
      },
    })
  }
}

export function drawHitbox(
  object: Container,
  graphics: Graphics,
  strokeThickness: number,
) {
  const global = object.getGlobalPosition()

  if (object.hitArea && object.hitArea instanceof Rectangle) {
    graphics.drawRect(
      object.hitArea.x,
      object.hitArea.y,
      object.hitArea.width - strokeThickness,
      object.hitArea.height - strokeThickness,
    )
  } else {
    // Handle anchor point
    graphics.drawRect(
      // @ts-expect-error - Better anchor check
      object.anchor ? global.x - object.anchor.x * object.width : global.x,
      // @ts-expect-error - Better anchor check
      object.anchor ? global.y - object.anchor.y * object.height : global.y,
      object.width - strokeThickness,
      object.height - strokeThickness,
    )
  }

  // Ensure that graphics always has scale 1
  // graphics.scale.set(1 / object.scale.x, 1 / object.scale.y)
}
