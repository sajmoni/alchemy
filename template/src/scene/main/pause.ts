import { graphics, container as createContainer, text } from 'alchemy-engine'

import { type Scene } from '~/type'

export default function pause(scene: Scene) {
  const c = createContainer(scene.container)

  const background = graphics(c)
  background
    .rect(0, scene.app.screen.height / 2 - 25, scene.app.screen.width, 50)
    .fill({ color: 0x000000, alpha: 0.8 })

  const t = text(c, { fontSize: 12, fill: 0xdddddd }, 'Game paused')
  t.anchor.set(0.5)
  t.position.set(scene.app.screen.width / 2, scene.app.screen.height / 2)

  c.visible = false

  scene.subscribeKey(scene.state.alchemy, 'paused', (paused) => {
    c.visible = paused
  })
}
