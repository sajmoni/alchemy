import * as PIXI from 'pixi.js'
import * as juice from 'juice.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import * as pixi from '~/pixi'
import state from '~/state'
import { Render, TextStyle, Scene } from '~/enum'
import { button } from '../../fragment'
import { settings } from '~/view'
import { name as gameTitle } from '~/../package.json'
import { clickBlink, easeOutToPosition } from '~/effect'
import { SceneArgs } from '~/type'

const mainMenu = ({ container }: SceneArgs): void => {
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
    startValue: titleText.style.fontSize as number,
    endValue: (titleText.style.fontSize as number) * 1.15,
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

  const _settings = settings()
  container.addChild(_settings)
}

export default mainMenu
