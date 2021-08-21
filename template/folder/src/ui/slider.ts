import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import * as pixi from '/pixi'
import { UIComponent } from '/type/ui'

const iconDistance = 25

type SliderOptions = {
  initialValue: string
  onMinus: () => void
  onPlus: () => void
}

const slider = ({
  initialValue,
  onMinus,
  onPlus,
}: SliderOptions): UIComponent<number> => {
  const component = new PIXI.Container()

  const minus = new PIXI.Sprite(ex.getTexture('plus-minus-2'))
  minus.x = -iconDistance
  minus.anchor.set(0.5)
  ex.makeClickable(minus, onMinus)
  component.addChild(minus)

  const text = pixi.text(
    initialValue,
    new PIXI.TextStyle({ fill: 'white', fontSize: 16 }),
  )
  component.addChild(text)

  const plus = new PIXI.Sprite(ex.getTexture('plus-minus-1'))
  plus.anchor.set(0.5)
  ex.makeClickable(plus, onPlus)
  plus.x = iconDistance
  component.addChild(plus)

  const render = (value: number): void => {
    text.text = value.toString()
  }

  return [component, render]
}

export default slider
