import { Container } from 'pixi.js'
import * as ex from 'pixi-ex'

import { Fragment, TextureMap } from '~/type/app'

const iconDistance = 25

type SliderOptions = {
  initialValue: string
  textures: TextureMap
  onMinus: () => void
  onPlus: () => void
}

const slider = ({
  initialValue,
  onMinus,
  onPlus,
  textures,
}: SliderOptions): Fragment<number> => {
  const component = new Container()

  const minus = ex.sprite(component, textures['plus-minus-2'])
  minus.x = -iconDistance
  minus.anchor.set(0.5)
  ex.onClick(minus, onMinus)

  const text = ex.text(component, { fill: 'white', fontSize: 16 }, initialValue)

  const plus = ex.sprite(component, textures['plus-minus-2'])
  plus.anchor.set(0.5)
  ex.onClick(plus, onPlus)
  plus.x = iconDistance

  const render = (value: number): void => {
    text.text = value.toString()
  }

  return [component, render]
}

export default slider
