import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

export default (initialValue, onMinus, onPlus) => {
  const component = new PIXI.Container()

  const minus = new PIXI.Sprite(ex.getTexture('plus-minus-0'))
  minus.x = -50
  minus.anchor.set(0.5)
  ex.makeClickable(minus, onMinus)
  component.addChild(minus)

  const text = new PIXI.Text(initialValue, { fill: 'white' })
  text.anchor.set(0.5)
  component.addChild(text)

  const plus = new PIXI.Sprite(ex.getTexture('plus-minus-1'))
  plus.anchor.set(0.5)
  ex.makeClickable(plus, onPlus)
  plus.x = 50
  component.addChild(plus)

  const render = (value) => {
    text.text = value
  }

  return [
    component,
    render,
  ]
}
