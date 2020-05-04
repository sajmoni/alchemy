import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters'
import * as juice from 'juice.js'
import { t } from '@lingui/macro'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import i18n from '/i18n'
import * as prism from '/util/prism'
import state from '/state'
import { Render, TextStyle, Scene } from '/constant'
import { button } from '/component'
import createSettings from '/component/settings'
import { name as gameTitle } from '../../../package.json'

import { clickBlink, easeOutToPosition } from '/effect'

const mainMenu = ({ app }) => {
  const container = new PIXI.Container()
  app.stage.addChild(container)

  const text = new PIXI.Text(gameTitle, { ...TextStyle.MAIN, fontSize: 60 })
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

  l1.repeat((counter) => {
    text.scale.set(getScale(counter))
  })

  const [settings, renderSettings] = createSettings()
  // @ts-ignore
  app.stage.addChild(settings)

  prism.subscribe('application.settingsVisible', (settingsVisible) => {
    // @ts-ignore
    renderSettings(settingsVisible)
  })
  // @ts-ignore
  renderSettings(state.application.settingsVisible)

  const [settingsButton] = button({
    label: i18n._(t('main.settings')`Settings`),
    textStyle: TextStyle.MAIN,
    onClick: () => {
      state.application.settingsVisible = true
    },
  })
  settingsButton.position.y = 600
  ex.centerX(settingsButton, Render.GAME_WIDTH / 2)
  container.addChild(settingsButton)

  const [startGameButton] = button({
    label: i18n._(t('main.startGame')`Start game`),
    textStyle: TextStyle.MAIN,
    onClick: () => {
      easeOutToPosition(startGameButton, {
        position: { y: 30, x: startGameButton.x },
      }).then(() => {
        clickBlink(
          startGameButton,
          container.children.filter((c) => c !== startGameButton),
        ).then(() => {
          container.destroy()
          state.scene = Scene.GAME
          l1.getAll()
            .filter(({ id }) => id !== 'fullscreenFadeInOut' && id !== 'debug')
            .forEach(l1.remove)
        })
      })
    },
  })
  startGameButton.position.y = 500
  ex.centerX(startGameButton, Render.GAME_WIDTH / 2)
  container.addChild(startGameButton)
}

export default mainMenu
