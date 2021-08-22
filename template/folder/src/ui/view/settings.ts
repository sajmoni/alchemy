import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import { subscribeKey } from 'valtio/utils'

import state from '/state'
import { Render, TextStyle } from '/enum'
// import { save } from '/util/storage'
import Sound from '/sound'
import * as pixi from '/pixi'
import app from '/app'
import { fadeOut } from '/effect'
// import select from './select'
import { slider } from '../fragment'
import button from '../fragment/button'
import { UIComponent } from '/type/ui'
import sound from '/sound'

const Color = {
  BACKGROUND: '#aaaaaa',
}

const MAX_VOLUME = 10
const MIN_VOLUME = 0

const SOUND_Y = 50
const BUTTONS_Y = Render.GAME_HEIGHT - 55

const width = Render.GAME_WIDTH * 0.6
const height = Render.GAME_HEIGHT * 0.8

const LEFT_COLUMN = (width / 4) * 1
const CENTER_COLUMN = (width / 4) * 2
// const RIGHT_COLUMN = (width / 4) * 3

// TODO Add message: "Data is only stored in your browser, if you
// erase your browser cache, all data will be lost."

const settings = (): PIXI.Container => {
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
    .beginFill(PIXI.utils.string2hex('#000000'), 0.8)
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

  background.interactive = true
  background.on('click', (event: PIXI.InteractionEvent) => {
    event.stopPropagation()
  })
  component.addChild(background)

  const title = pixi.text(`Settings`, new PIXI.TextStyle(TextStyle.MAIN))
  title.position.set(width / 2, 10)
  component.addChild(title)

  const [soundSlider, renderSoundSlider] = makeVolumeSlider({
    x: LEFT_COLUMN,
    y: SOUND_Y,
    volume: state.application.volume.sound,
    label: `Sound`,
    onMinus: () => {
      const currentVolume = state.application.volume.sound
      state.application.volume.sound = Math.max(currentVolume - 1, MIN_VOLUME)
      sound.coin.play()
    },
    onPlus: () => {
      const currentVolume = state.application.volume.sound
      state.application.volume.sound = Math.min(currentVolume + 1, MAX_VOLUME)
      sound.coin.play()
    },
  })
  component.addChild(soundSlider)

  const [musicSlider, renderMusicSlider] = makeVolumeSlider({
    volume: state.application.volume.music,
    x: LEFT_COLUMN,
    y: SOUND_Y + 50,
    label: `Music`,
    onMinus: () => {
      const currentVolume = state.application.volume.music
      state.application.volume.music = Math.max(currentVolume - 1, MIN_VOLUME)
    },
    onPlus: () => {
      const currentVolume = state.application.volume.music
      state.application.volume.music = Math.min(currentVolume + 1, MAX_VOLUME)
    },
  })

  component.addChild(musicSlider)

  // const [languagePicker, renderLanguagePicker] = select({
  //   options: Object.values(Language).map(({ label, code }) => ({
  //     label,
  //     value: code,
  //   })),
  //   title: 'Choose language',
  //   onClick: (languageCode) => {
  //     save('language', languageCode)
  //     window.location.reload()
  //   },
  // })

  // renderLanguagePicker(state.application.language)
  // languagePicker.position.set(RIGHT_COLUMN, SOUND_Y)
  // component.addChild(languagePicker)

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

  const renderSettings = (visible: boolean): void => {
    if (visible) {
      component.visible = true
      overlay.visible = true
      component.alpha = 1
    } else if (visible !== component.visible) {
      void fadeOut(component, { resolveAt: 0.6, duration: 15 }).then(() => {
        component.visible = false
        overlay.visible = false
      })
    }
  }

  renderSettings(state.application.settingsVisible)

  subscribeKey(state.application, 'settingsVisible', renderSettings)
  subscribeKey(state.application.volume, 'music', renderMusicSlider)
  subscribeKey(state.application.volume, 'sound', renderSoundSlider)

  return component
}

const makeVolumeSlider = ({
  x,
  y,
  volume,
  onMinus,
  onPlus,
  label,
}: {
  x: number
  y: number
  volume: number
  onMinus: () => void
  onPlus: () => void
  label: string
}): UIComponent<number> => {
  const container = new PIXI.Container()

  container.position.set(x, y)

  const text = pixi.text(label, new PIXI.TextStyle(TextStyle.MAIN))
  text.position.set(0, -20)
  container.addChild(text)

  const [volumeSlider, volumeSliderRender] = slider({
    initialValue: volume.toString(),
    onMinus,
    onPlus,
  })

  container.addChild(volumeSlider)

  return [container, volumeSliderRender]
}

export default settings