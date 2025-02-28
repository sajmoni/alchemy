import { Application, Container, Graphics, Rectangle } from 'pixi.js'

import { graphics, text } from '../module/create.js'
import { onClick, onHover } from '../module/event.js'
import getAllLeafChildren from '../module/getAllLeafChildren.js'
import logObject from '../module/logObject.js'

export default function initializeInspectMode(app: Application) {
  app.stage.sortableChildren = true
  // Do this first to not include the debug items in the list
  const objects = getAllLeafChildren(app.stage)

  const hitboxGraphics = graphics(app.stage)
  hitboxGraphics.label = 'hitboxGraphics'
  hitboxGraphics.zIndex = 9999
  const strokeThickness = 2

  const hoverText = text(app.stage, {
    fontSize: 8,
    stroke: '#d53434',
    //  TODO: Figure this one out
    // strokeThickness: 2,
  })
  hoverText.label = 'hoverText'
  hoverText.zIndex = 9999

  for (const object of objects) {
    onClick(object, () => {
      logObject(object)
    })
    onHover(object, {
      onOver: () => {
        hoverText.visible = true
        hoverText.text = object.label ?? '(No name)'

        const global = object.getGlobalPosition()
        hoverText.position.set(global.x, global.y)
        hitboxGraphics.stroke({ width: strokeThickness, color: 0x22ff22 })
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
    graphics.rect(
      object.hitArea.x,
      object.hitArea.y,
      object.hitArea.width - strokeThickness,
      object.hitArea.height - strokeThickness,
    )
  } else {
    // Handle anchor point
    graphics.rect(
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
