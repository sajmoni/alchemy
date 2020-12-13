import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import * as pixi from '../pixi'

type ButtonOptions = {
  readonly label: string
  readonly onClick: () => void
  readonly textStyle: PIXI.TextStyle
  readonly backgroundTexture?: PIXI.Texture
}

const button = ({
  label: labelString,
  onClick,
  textStyle,
  backgroundTexture = undefined,
}: ButtonOptions): [PIXI.Container] => {
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

  // TODO: Pass in state? Active, disabled etc. Change label?
  // const render = (value) => {
  // }

  return [
    component,
    // render,
  ]
}

export default button
