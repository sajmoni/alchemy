// * Replace this file with your game

import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters'
import * as particles from 'pixi-particles'
import * as juice from 'juice.js'
import { t } from '@lingui/macro'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import i18n from '../i18n'
import * as prism from '../util/prism'
import app from '../app'
import state from '../state'
import { Render, TextStyle } from '../constant'
import { bar, button } from '../component'
import { explosion } from '../particle'
import createSettings from '../component/settings'

import { clickBlink, easeOutToPosition } from '../effect'

const initializeGame = () => {
  const container = new PIXI.Container()
  app.stage.addChild(container)

  const [manaBar, renderManaBar] = bar({
    initialValue: 1,
  })
  manaBar.position.set(200, 200)
  container.addChild(manaBar)
  const barBehavior = l1.repeat(() => {
    state.bar -= 1
    if (state.bar === 0) {
      l1.remove(barBehavior)
    }
  }, 10)
  prism.subscribe(['bar'], (state) => {
    // value / max
    renderManaBar(state.bar / 100)
  })

  const sprite = new PIXI.Sprite(ex.getTexture('square1'))
  sprite.x = 10
  sprite.y = Render.GAME_HEIGHT / 2
  sprite.anchor.set(0.5)
  container.addChild(sprite)

  l1.repeat(() => {
    state.square.x += 1
  }, 4)

  l1.repeat(() => {
    state.square.angle += 2
  })

  l1.repeat(() => {
    if (state.square.visible) {
      state.square.visible = false
    } else {
      state.square.visible = true
    }
  }, 30)

  const unsubscribeSquare = prism.subscribe(
    ['square.speed', 'square.angle', 'square.visible'],
    ({ square: { angle, x } }) => {
      sprite.x = x
      sprite.angle = angle
    },
  )

  l1.once(() => {
    unsubscribeSquare()
    sprite.destroy()
  }, 500)

  const text = new PIXI.Text(
    i18n._(t('main.gameStarted')`Game started!`),
    TextStyle.MAIN,
  )
  text.filters = [new filters.CRTFilter()]

  ex.centerX(text, Render.GAME_WIDTH / 2)
  ex.centerY(text, Render.GAME_HEIGHT / 2)

  ex.makeResizable(text)
  container.addChild(text)

  const getScale = juice.sine({
    duration: 180,
    startValue: 1,
    endValue: 1.2,
  })

  l1.repeat((counter) => {
    text.scale.set(getScale(counter))
  })

  const particleContainer = new PIXI.Container()
  particleContainer.position.set(400, 200)
  container.addChild(particleContainer)

  const explosionParticles = new particles.Emitter(
    particleContainer,
    ['square1', 'square2'].map(ex.getTexture),
    explosion,
  )

  explosionParticles.playOnceAndDestroy()

  const [settings, renderSettings] = createSettings()
  // @ts-ignore
  app.stage.addChild(settings)

  prism.subscribe(
    'application.settingsVisible',
    ({ application: { settingsVisible } }) => {
      // @ts-ignore
      renderSettings(settingsVisible)
    },
  )
  // @ts-ignore
  renderSettings(state.application.settingsVisible)

  const [settingsButton] = button({
    label: i18n._(t('main.settings')`Settings`),
    textStyle: TextStyle.MAIN,
    onClick: () => {
      state.application.settingsVisible = true
    },
  })
  settingsButton.position.set(600, 600)
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
          l1.getAll()
            .filter(({ id }) => id !== 'fullscreenFadeInOut' && id !== 'debug')
            .forEach(l1.remove)
        })
      })
    },
  })
  startGameButton.position.set(600, 500)
  container.addChild(startGameButton)
}

export default initializeGame
