import { TextStyle as PixiTextStyle } from 'pixi.js'
import * as juice from 'juice.js'
import { text, centerX } from 'pixi-ex'

import state from '~/state'
import { Render, TextStyle, Scene } from '~/enum/app'
import button from '~/fragment/ui/button'
import settings from '~/view/settings'
import { name as gameTitle } from '~/../package.json'
import clickBlink from '~/effect/clickBlink'
import easeOutToPosition from '~/effect/easeOutToPosition'
import { SceneArgs } from '~/type/app'

const mainMenu = ({ container, textures, run }: SceneArgs): void => {
  const titleText = text(
    container,
    { ...TextStyle.MAIN, fontSize: 25 },
    gameTitle,
  )

  titleText.anchor.set(0.5)
  titleText.x = Render.GAME_WIDTH / 2
  titleText.y = Render.GAME_HEIGHT / 3

  const getFontSize = juice.sine({
    duration: 240,
    startValue: titleText.style.fontSize as number,
    endValue: (titleText.style.fontSize as number) * 1.15,
  })

  run.forever((counter) => {
    titleText.style.fontSize = getFontSize(counter)
  }, 1)

  const [settingsButton] = button({
    label: `Settings`,
    textStyle: TextStyle.MAIN,
    onClick: () => {
      state.application.settingsVisible = true
    },
  })
  settingsButton.position.y = Render.GAME_HEIGHT - 20
  centerX(settingsButton, Render.GAME_WIDTH / 2)
  container.addChild(settingsButton)

  const [startGameButton] = button({
    label: `Start game`,
    textStyle: new PixiTextStyle(TextStyle.MAIN),
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
  centerX(startGameButton, Render.GAME_WIDTH / 2)
  container.addChild(startGameButton)

  const _settings = settings(textures)
  container.addChild(_settings)
}

export default mainMenu
