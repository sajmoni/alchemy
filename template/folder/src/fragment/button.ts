import { Container, ITextStyle, Texture } from 'pixi.js'
import * as ex from 'pixi-ex'

import { Fragment } from '~/type'

type ButtonOptions = {
  label: string
  onClick: () => void
  textStyle: Partial<ITextStyle>
  backgroundTexture?: Texture
}

const button = ({
  label: labelString,
  onClick,
  textStyle,
  backgroundTexture = undefined,
}: ButtonOptions): Fragment<void> => {
  const component = new Container()

  ex.onClick(component, () => {
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
