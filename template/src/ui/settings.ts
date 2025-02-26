import { text, sync, container, graphics, onClick } from 'alchemy-engine'

import { TextStyle } from '~/data'
import { type Scene } from '~/type'

export default function settings(scene: Scene) {
  const settingsContainer = container(scene.container)
  settingsContainer.position.set(
    scene.app.screen.width / 2,
    scene.app.screen.height / 2,
  )

  const width = scene.app.screen.width * 0.6
  const height = scene.app.screen.height * 0.8
  settingsContainer.width = width
  settingsContainer.height = height
  settingsContainer.pivot.set(width / 2, height / 2)

  const background = graphics(settingsContainer)
  background.rect(0, 0, width, height).fill(0xaaaaaa)

  const title = text(settingsContainer, TextStyle.MAIN, `Settings`)
  title.anchor.set(0.5)
  title.position.set(width / 2, 20)

  const doneButton = text(settingsContainer, TextStyle.MAIN, `Done`)
  doneButton.anchor.set(0.5)
  doneButton.position.set(width / 2, height - 30)
  onClick(doneButton, () => {
    scene.state.settingsVisible = false
  })

  settingsContainer.visible = false
  sync(settingsContainer, 'visible', scene.state, 'settingsVisible')
}
