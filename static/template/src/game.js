import * as PIXI from 'pixi.js'
import * as juice from 'juice.js'
import { t } from '@lingui/macro'
import * as ex from 'pixi-ex'
import * as l1 from 'l1'

import { GAME_HEIGHT, GAME_WIDTH } from './constant'
import Sound from './sound'
import i18n from './i18n'
import * as prism from './util/prism'
import app from './app'

export default () => {
  const sprite = new PIXI.Sprite(ex.getTexture('square1'))
  sprite.x = 10
  sprite.y = 50
  sprite.anchor.set(0.5)
  app.stage.addChild(sprite)

  l1.repeat(() => {
    prism.state.square.x += 1
  }, 4)

  l1.repeat(() => {
    prism.state.square.angle += 2
  })

  l1.repeat(() => {
    if (prism.getState().square.visible) {
      prism.state.square.visible = false
    } else {
      prism.state.square.visible = true
    }
  }, 30)

  const disconnectSquare = prism.connect(['square.speed', 'square.angle', 'square.visible'],
    ({
      square: {
        angle, x,
      },
    }) => {
      sprite.x = x
      sprite.angle = angle
    })

  l1.once(() => {
    disconnectSquare()
    sprite.destroy()
  }, 500)

  const text = new PIXI.Text(i18n._(t('main.gameStarted')`Game started!`),
    {
      fontFamily: 'patchy-robots', fill: 'white', fontSize: 30,
    })

  text.anchor.set(0.5)
  text.x = GAME_WIDTH / 2
  text.y = GAME_HEIGHT / 2
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
