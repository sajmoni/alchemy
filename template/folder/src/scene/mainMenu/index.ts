import * as PIXI from 'pixi.js'
import * as juice from 'juice.js'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import * as pixi from '/pixi'
import state from '/state'
import { Render, TextStyle, Scene } from '/enum'
import { button } from '/ui'
import createSettings from '/ui/settings'
import { name as gameTitle } from '/../package.json'
import { clickBlink, easeOutToPosition } from '/effect'
import { RenderScene, SceneArgs } from '/type/scene'

const mainMenu = ({ container }: SceneArgs): RenderScene => {
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

  const [
    settings,
    { renderSettings, renderSoundSlider, renderMusicSlider },
  ] = createSettings()
  container.addChild(settings)

  renderSettings(state.application.settingsVisible)

  return {
    'application.settingsVisible': renderSettings,
    'application.volume.music': renderMusicSlider,
    'application.volume.sound': renderSoundSlider,
  }
}

export default mainMenu
