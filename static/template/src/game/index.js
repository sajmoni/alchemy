// * Replace this file with your game

import * as PIXI from 'pixi.js'
import * as juice from 'juice.js'
import { t } from '@lingui/macro'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import Sound from '../sound'
import i18n from '../i18n'
import * as prism from '../util/prism'
import app from '../app'
import centerX from '../util/centerX'
import centerY from '../util/centerY'
import textStyleMain from '../textStyle/main'
import { GAME_HEIGHT } from '../constant'

export default () => {
  const sprite = new PIXI.Sprite(ex.getTexture('square1'))
  sprite.x = 10
  sprite.y = GAME_HEIGHT / 2
  sprite.anchor.set(0.5)
  app.stage.addChild(sprite)

  l1.repeat(() => {
    prism.state.square.x += 1
  }, 4)

  l1.repeat(() => {
    prism.state.square.angle += 2
  })

  l1.repeat(() => {
    if (prism.state.square.visible) {
      prism.state.square.visible = false
    } else {
      prism.state.square.visible = true
    }
  }, 30)

  const unsubscribeSquare = prism.subscribe(['square.speed', 'square.angle', 'square.visible'],
    ({
      square: {
        angle, x,
      },
    }) => {
      sprite.x = x
      sprite.angle = angle
    })

  l1.once(() => {
    unsubscribeSquare()
    sprite.destroy()
  }, 500)

  const text = new PIXI.Text(i18n._(t('main.gameStarted')`Game started!`), textStyleMain)

  centerX(text)
  centerY(text)

  ex.makeResizable(text)
  app.stage.addChild(text)

  const getScale = juice.sine({
    duration: 180,
    startValue: 1,
    endValue: 1.2,
  })

  l1.repeat((counter) => {
    text.scale.set(getScale(counter))
  })

  Sound.SWORD_01.play()
}
