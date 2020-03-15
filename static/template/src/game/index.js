// * Replace this file with your game

import * as PIXI from 'pixi.js'
import * as filters from 'pixi-filters'
import * as particles from 'pixi-particles'
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
import { Render, Language, TextStyle } from '../constant'
import { slider, bar, select} from '../component'
import { getVolume } from '../selector'
import { explosion } from '../particle'
import { save } from '../util/storage'

export default () => {
  const [manaBar, renderManaBar] = bar({
    initialValue: 1,
  })
  manaBar.position.set(200, 200)
  app.stage.addChild(manaBar)
  l1.repeat(() => {
    prism.state.bar -= 1
  }, 10)
  prism.subscribe(['bar'], (state) => {
    // value / max
    renderManaBar((state.bar / 100).toFixed(2))
  })

  makeVolumeSlider()

  const sprite = new PIXI.Sprite(ex.getTexture('square1'))
  sprite.x = 10
  sprite.y = Render.GAME_HEIGHT / 2
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

  const text = new PIXI.Text(i18n._(t('main.gameStarted')`Game started!`), TextStyle.MAIN)
  text.filters = [new filters.CRTFilter()]

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

  const particleContainer = new PIXI.Container()
  particleContainer.position.set(400, 200)
  app.stage.addChild(particleContainer)

  const explosionParticles = new particles.Emitter(
    particleContainer,
    ['square1', 'square2'].map(ex.getTexture),
    explosion,
  )

  explosionParticles.playOnceAndDestroy()

  const [languagePicker, renderLanguagePicker] = select({ 
    languages: Object.values(Language), 
    onClick: (languageCode) => {
      save('language', languageCode)
      window.location.reload()
    }
  })
  
  renderLanguagePicker(prism.state.application.language)

  languagePicker.position.set(600, 100)
  app.stage.addChild(languagePicker)

  Sound.SWORD_01.play()
}

const makeVolumeSlider = () => {
  const MAX_VOLUME = 10
  const MIN_VOLUME = 0

  const volume = getVolume(prism.state)

  const container = new PIXI.Container()
  container.position.set(Render.GAME_WIDTH - 100, Render.GAME_HEIGHT - 50)
  app.stage.addChild(container)

  const text = new PIXI.Text(i18n._(t('settings.volume')`Volume`), TextStyle.MAIN)
  text.anchor.set(0.5)
  text.position.set(-5, -40)
  container.addChild(text)

  const [volumeSlider, volumeSliderRender] = slider(volume, () => {
    const currentVolume = getVolume(prism.state)
    prism.state.application.volume = Math.max(currentVolume - 1, MIN_VOLUME)
  }, () => {
    const currentVolume = getVolume(prism.state)
    prism.state.application.volume = Math.min(currentVolume + 1, MAX_VOLUME)
  })

  container.addChild(volumeSlider)

  prism.subscribe(['application.volume'], (state) => {
    const newVolume = getVolume(state)
    volumeSliderRender(newVolume)
  })
}
