import { Graphics, utils } from 'pixi.js'

import { Fragment } from '~/type/app'

const HEIGHT = 7

type BarOptions = {
  initialValue?: number
  onColor?: string
  offColor?: string
  backgroundColor?: string
  width?: number
}

const bar = ({
  initialValue = 1,
  onColor = '#ff8888',
  offColor = '#dddddd',
  backgroundColor = '#000000',
  width = 100,
}: BarOptions = {}): Fragment<number> => {
  const component = new Graphics()

  const paddedWidth = width + 2

  const BAR_X = -(paddedWidth / 2)

  const render = (value: number): void => {
    component.clear()
    component.beginFill(utils.string2hex(backgroundColor))
    component.drawRect(BAR_X, 0, paddedWidth, HEIGHT + 2)

    component.beginFill(utils.string2hex(offColor))
    component.drawRect(BAR_X + 1, 1, width, HEIGHT)

    component.beginFill(utils.string2hex(onColor))
    const valueWidth = Math.max(Math.floor(width * value), 0)
    component.drawRect(BAR_X + 1, 1, valueWidth, HEIGHT)
  }

  render(initialValue)

  return [component, render]
}

export default bar
