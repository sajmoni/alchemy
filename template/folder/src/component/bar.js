import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

const HEIGHT = 7

export default ({
  initialValue,
  onColor = '#ff0000',
  offColor = '#ff00ff',
  backgroundColor = '#000000',
  width = 100,
}) => {
  const component = new PIXI.Graphics()

  const paddedWidth = width + 2

  const BAR_X = -(paddedWidth / 2)

  const render = (value) => {
    component.clear()
    component.beginFill(ex.fromHex(backgroundColor))
    component.drawRect(BAR_X, 0, paddedWidth, HEIGHT + 2)

    component.beginFill(ex.fromHex(offColor))
    component.drawRect(BAR_X + 1, 1, width, HEIGHT)

    component.beginFill(ex.fromHex(onColor))
    const valueWidth = Math.max(Math.floor(width * value), 0)
    component.drawRect(BAR_X + 1, 1, valueWidth, HEIGHT)
  }

  render(initialValue)

  return [component, render]
}
