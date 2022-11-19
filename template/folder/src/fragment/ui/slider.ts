import { Container } from 'pixi.js'
import { sprite, onClick, text } from 'pixi-ex'

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

  const minus = sprite(component, textures['plus-minus-1'])
  minus.x = -iconDistance
  minus.anchor.set(0.5)
  onClick(minus, onMinus)

  const _text = text(component, { fill: 'white', fontSize: 16 }, initialValue)

  const plus = sprite(component, textures['plus-minus-2'])
  plus.anchor.set(0.5)
  onClick(plus, onPlus)
  plus.x = iconDistance

  const render = (value: number): void => {
    _text.text = value.toString()
  }

  return [component, render]
}

export default slider
