import { text, onClick } from 'alchemy-engine'

import packageJson from '~/../package.json' with { type: 'json' }
import { TextStyle } from '~/data.js'
import { type Scene } from '~/type.js'
import settings from '../ui/settings.js'

export default async function mainMenu(scene: Scene) {
  const { container, state, setScene, app, animate } = scene

  const titleText = text(
    container,
    { ...TextStyle.MAIN, fontSize: 50 },
    packageJson.name,
  )
  titleText.anchor = 0.5
  titleText.position = { x: app.screen.width / 2, y: app.screen.height / 3 }

  animate.sine({
    onUpdate: (value) => {
      titleText.angle = value
    },
    startValue: titleText.angle - 3,
    endValue: titleText.angle + 3,
    duration: 280,
  })

  const startGameButton = text(
    container,
    { ...TextStyle.MAIN, fontSize: 20 },
    'Start game',
  )
  startGameButton.anchor = 0.5
  startGameButton.position = {
    x: app.screen.width / 2,
    y: app.screen.height - 140,
  }

  onClick(startGameButton, () => {
    setScene('game')
  })

  const settingsButton = text(
    container,
    { ...TextStyle.MAIN, fontSize: 20 },
    'Settings',
  )
  settingsButton.anchor = 0.5
  settingsButton.position = {
    x: app.screen.width / 2,
    y: app.screen.height - 100,
  }
  onClick(settingsButton, () => {
    state.settingsVisible = true
  })

  settings(scene)
}
