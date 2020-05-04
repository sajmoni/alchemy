import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

export default ({
  label: labelString,
  onClick,
  backgroundTexture = null,
  textStyle,
}): [PIXI.Container] => {
  const component = new PIXI.Container()

  ex.makeClickable(component, () => {
    onClick()
  })

  if (backgroundTexture) {
    const button = new PIXI.Sprite(backgroundTexture)
    button.anchor.set(0.5)
    component.addChild(button)
  }

  const label = new PIXI.Text(labelString, textStyle)
  component.addChild(label)

  // TODO: Pass in state? Active, disabled etc. Change label?
  // const render = (value) => {
  // }

  return [
    component,
    // render,
  ]
}
