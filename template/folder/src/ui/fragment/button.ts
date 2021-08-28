import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import * as pixi from '/pixi'
import { Fragment } from '/type'

type ButtonOptions = {
  label: string
  onClick: () => void
  textStyle: PIXI.TextStyle
  backgroundTexture?: PIXI.Texture
}

const button = ({
  label: labelString,
  onClick,
  textStyle,
  backgroundTexture = undefined,
}: ButtonOptions): Fragment<void> => {
  const component = new PIXI.Container()

  ex.makeClickable(component, () => {
    onClick()
  })

  if (backgroundTexture) {
    const button = new PIXI.Sprite(backgroundTexture)
    button.anchor.set(0.5)
    component.addChild(button)
  }

  const label = pixi.text(labelString, textStyle)
  label.anchor.set(0)
  component.addChild(label)

  const render = (): void => {
    // noop
  }

  return [component, render]
}

export default button
