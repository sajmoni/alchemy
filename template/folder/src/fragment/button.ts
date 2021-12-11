import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import { Fragment } from '~/type'

type ButtonOptions = {
  label: string
  onClick: () => void
  textStyle: Partial<PIXI.ITextStyle>
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
    const button = ex.sprite(component, backgroundTexture)
    button.anchor.set(0.5)
  }

  const label = ex.text(component, textStyle, labelString)
  label.anchor.set(0)

  const render = (): void => {
    // noop
  }

  return [component, render]
}

export default button
