import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

export default ({
  label: labelString,
  onClick,
  texture,
  textStyle,
}) => {
  const component = new PIXI.Container()

  ex.makeClickable(component, () => {
    onClick()
  })

  const button = new PIXI.Sprite(texture)
  button.anchor.set(0.5)
  component.addChild(button)

  const label = new PIXI.Text(labelString, textStyle)
  // label.y = -7
  label.anchor.set(0.5)

  // TODO: Pass in state? Active, disabled etc. Change label?
  // const render = (value) => {
  // }

  return [
    component,
    // render,
  ]
}
