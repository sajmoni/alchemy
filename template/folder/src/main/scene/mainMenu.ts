import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters'
import * as juice from 'juice.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import state from '../../state'
import { Render, TextStyle, Scene } from '../../constant'
import { button } from '../../component'
import createSettings from '../ui/settings'
import { name as gameTitle } from '../../../package.json'
import { clickBlink, easeOutToPosition } from '../../effect'
import { SceneArgs } from '../../type/scene'

const mainMenu = ({ container, subscribe }: SceneArgs) => {
  const text = new PIXI.Text(
    gameTitle,
    new PIXI.TextStyle({ ...TextStyle.MAIN, fontSize: 60 }),
  )
  text.filters = [new filters.CRTFilter()]

  ex.centerX(text, Render.GAME_WIDTH / 2)
  ex.centerY(text, Render.GAME_HEIGHT / 3)

  ex.makeResizable(text)
  container.addChild(text)

  const getScale = juice.sine({
    duration: 240,
    startValue: 1,
    endValue: 1.15,
  })

  l1.forever((counter) => {
    text.scale.set(getScale(counter))
  })

  const [settingsButton] = button({
    label: `Settings`,
    textStyle: new PIXI.TextStyle(TextStyle.MAIN),
    onClick: () => {
      state.application.settingsVisible = true
    },
  })
  settingsButton.position.y = 600
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
  startGameButton.position.y = 500
  ex.centerX(startGameButton, Render.GAME_WIDTH / 2)
  container.addChild(startGameButton)

  const [settings, renderSettings] = createSettings()
  // @ts-expect-error
  container.addChild(settings)

  subscribe('application.settingsVisible', (settingsVisible) => {
    // @ts-expect-error
    renderSettings(settingsVisible)
  })
  // @ts-expect-error
  renderSettings(state.application.settingsVisible)
}

export default mainMenu
