import * as PIXI from 'pixi.js'
import * as juice from 'juice.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'
import * as prism from 'state-prism'

import * as pixi from '../../pixi'
import state from '../../state'
import { Render, TextStyle, Scene } from '../../constant'
import { button } from '../../component'
import createSettings from '../ui/settings'
import { name as gameTitle } from '../../../package.json'
import { clickBlink, easeOutToPosition } from '../../effect'
import { SceneArgs } from '../../type/scene'

const mainMenu = ({ container }: SceneArgs) => {
  const titleText = pixi.text(
    gameTitle,
    new PIXI.TextStyle({ ...TextStyle.MAIN, fontSize: 25 }),
  )

  titleText.anchor.set(0.5)
  titleText.x = Render.GAME_WIDTH / 2
  titleText.y = Render.GAME_HEIGHT / 3

  container.addChild(titleText)

  const getFontSize = juice.sine({
    duration: 240,
    startValue: titleText.style.fontSize,
    endValue: titleText.style.fontSize * 1.15,
  })

  l1.forever((counter) => {
    titleText.style.fontSize = getFontSize(counter)
  })

  const [settingsButton] = button({
    label: `Settings`,
    textStyle: new PIXI.TextStyle(TextStyle.MAIN),
    onClick: () => {
      state.application.settingsVisible = true
    },
  })
  settingsButton.position.y = Render.GAME_HEIGHT - 20
  ex.centerX(settingsButton, Render.GAME_WIDTH / 2)
  container.addChild(settingsButton)

  const [startGameButton] = button({
    label: `Start game`,
    textStyle: new PIXI.TextStyle(TextStyle.MAIN),
    onClick: async () => {
      await easeOutToPosition(startGameButton, {
        position: { y: Render.GAME_HEIGHT / 2, x: startGameButton.x },
      })

      await clickBlink(
        startGameButton,
        container.children.filter((c) => c !== startGameButton),
      )

      state.scene = Scene.GAME
    },
  })
  startGameButton.position.y = Render.GAME_HEIGHT - 40
  ex.centerX(startGameButton, Render.GAME_WIDTH / 2)
  container.addChild(startGameButton)

  const [settings, renderSettings] = createSettings()
  container.addChild(settings)

  prism.subscribe('application.settingsVisible', (settingsVisible) => {
    renderSettings(settingsVisible)
  })
  renderSettings(state.application.settingsVisible)
}

export default mainMenu
