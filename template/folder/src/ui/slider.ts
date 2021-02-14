import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import * as pixi from '/pixi'

type render = (value: string) => void

type SliderOptions = {
  initialValue: string
  onMinus: () => void
  onPlus: () => void
}

const slider = ({
  initialValue,
  onMinus,
  onPlus,
}: SliderOptions): [PIXI.Container, render] => {
  const component = new PIXI.Container()
  component.scale.set(0.5)

  const minus = new PIXI.Sprite(ex.getTexture('plus-minus-1'))
  minus.x = -50
  minus.anchor.set(0.5)
  ex.makeClickable(minus, onMinus)
  component.addChild(minus)

  const text = pixi.text(initialValue, new PIXI.TextStyle({ fill: 'white' }))
  component.addChild(text)

  const plus = new PIXI.Sprite(ex.getTexture('plus-minus-2'))
  plus.anchor.set(0.5)
  ex.makeClickable(plus, onPlus)
  plus.x = 50
  component.addChild(plus)

  const render = (value: string): void => {
    text.text = value
  }

  return [component, render]
}

export default slider
