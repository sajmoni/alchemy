import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import * as prism from 'state-prism'

import state from '../../state'
import { Render, Language, TextStyle } from '../../constant'
import select from '../../component/select'
import { save } from '../../util/storage'
import { getSoundVolume, getMusicVolume } from '../../selector'
import { slider } from '../../component'
import Sound from '../../sound'
import app from '../../app'
import button from '../../component/button'
import { fadeOut } from '../../effect'

const Color = {
  BACKGROUND: '#aaaaaa',
}

const MAX_VOLUME = 10
const MIN_VOLUME = 0

const SOUND_Y = 200
const BUTTONS_Y = 520

const width = Render.GAME_WIDTH * 0.6
const height = Render.GAME_HEIGHT * 0.8

const LEFT_COLUMN = (width / 4) * 1
const CENTER_COLUMN = (width / 4) * 2
const RIGHT_COLUMN = (width / 4) * 3

// TODO: Wipe all stored data - with confirm dialog
// Add "Warning - Data is only stored in your browser, if you
// erase your browser history, all data will be lost."

const settings = () => {
  const component = new PIXI.Container()
  component.zIndex = 10
  component.visible = false

  component.interactive = true
  component.position.set(Render.GAME_WIDTH / 2, Render.GAME_HEIGHT / 2)
  component.width = width
  component.height = height
  component.pivot.set(CENTER_COLUMN, height / 2)

  const overlay = new PIXI.Graphics()
  overlay
    .beginFill(PIXI.utils.string2hex('#000000'), 0.5)
    .drawRect(
      -((Render.GAME_WIDTH - width) / 2),
      -((Render.GAME_HEIGHT - height) / 2),
      Render.GAME_WIDTH,
      Render.GAME_HEIGHT,
    )
    .endFill()
  ex.makeClickable(overlay, () => {
    state.application.settingsVisible = false
  })
  overlay.visible = false
  component.addChild(overlay)

  const background = new PIXI.Graphics()
  background
    .beginFill(PIXI.utils.string2hex(Color.BACKGROUND))
    .drawRect(0, 0, width, height)
    .endFill()
    .lineStyle({ color: PIXI.utils.string2hex('#ff00ff'), width: 2 })
    .moveTo(CENTER_COLUMN, 0)
    .lineTo(CENTER_COLUMN, height)

  background.interactive = true
  background.on('click', (event) => {
    event.stopPropagation()
  })
  component.addChild(background)

  const title = new PIXI.Text(`Settings`, new PIXI.TextStyle(TextStyle.MAIN))
  title.anchor.set(0.5)
  title.position.set(width / 2, 50)
  component.addChild(title)

  const [soundSlider, renderSoundSlider] = makeVolumeSlider({
    x: LEFT_COLUMN,
    y: SOUND_Y,
    volume: getSoundVolume(state),
    label: `Sound`,
    onMinus: () => {
      const currentVolume = getSoundVolume(state)
      state.application.volume.sound = Math.max(currentVolume - 1, MIN_VOLUME)
      Sound.SWORD_01.play()
    },
    onPlus: () => {
      const currentVolume = getSoundVolume(state)
      state.application.volume.sound = Math.min(currentVolume + 1, MAX_VOLUME)
      Sound.SWORD_01.play()
    },
  })
  component.addChild(soundSlider)

  const [musicSlider, renderMusicSlider] = makeVolumeSlider({
    volume: getMusicVolume(state),
    x: LEFT_COLUMN,
    y: SOUND_Y + 100,
    label: `Music`,
    onMinus: () => {
      const currentVolume = getMusicVolume(state)
      state.application.volume.music = Math.max(currentVolume - 1, MIN_VOLUME)
      // Sound.SWORD_01.play()
    },
    onPlus: () => {
      const currentVolume = getMusicVolume(state)
      state.application.volume.music = Math.min(currentVolume + 1, MAX_VOLUME)
      // Sound.SWORD_01.play()
    },
  })

  component.addChild(musicSlider)

  const [languagePicker, renderLanguagePicker] = select({
    options: Object.values(Language).map(({ label, code }) => ({
      label,
      value: code,
    })),
    title: 'Choose language',
    onClick: (languageCode) => {
      save('language', languageCode)
      window.location.reload()
    },
  })

  renderLanguagePicker(state.application.language)
  languagePicker.position.set(RIGHT_COLUMN, SOUND_Y)
  component.addChild(languagePicker)

  prism.subscribe('application.volume.sound', (newVolume) => {
    renderSoundSlider(newVolume)
  })
  prism.subscribe('application.volume.music', (newVolume) => {
    renderMusicSlider(newVolume)
  })

  const [doneButton] = button({
    textStyle: new PIXI.TextStyle(TextStyle.MAIN),
    label: `Done`,
    onClick: () => {
      state.application.settingsVisible = false
    },
  })
  doneButton.position.y = BUTTONS_Y
  ex.centerX(doneButton, CENTER_COLUMN)
  component.addChild(doneButton)

  app.stage.addChild(component)

  const render = (visible) => {
    if (visible) {
      component.visible = true
      overlay.visible = true
      component.alpha = 1
    } else if (visible !== component.visible) {
      fadeOut(component, { resolveAt: 0.6, duration: 15 }).then(() => {
        component.visible = false
        overlay.visible = false
      })
    }
  }

  return [component, render]
}

const makeVolumeSlider = ({ x, y, volume, onMinus, onPlus, label }) => {
  const container = new PIXI.Container()

  container.position.set(x, y)

  const text = new PIXI.Text(label, new PIXI.TextStyle(TextStyle.MAIN))
  text.anchor.set(0.5)
  text.position.set(0, -40)
  container.addChild(text)

  const [volumeSlider, volumeSliderRender] = slider({
    initialValue: volume,
    onMinus,
    onPlus,
  })

  container.addChild(volumeSlider)

  return [container, volumeSliderRender]
}

export default settings
