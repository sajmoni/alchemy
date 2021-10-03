import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import { Fragment } from '~/type'

type Option = {
  value: string
  label: string
}

type SelectOptions = {
  options: Option[]
  onClick: (value: string) => void
  title: string
}

const select = ({
  options,
  onClick,
  title,
}: SelectOptions): Fragment<string> => {
  const component = new PIXI.Container()

  const titleText = ex.text(component, { fill: 'white' }, title)

  const optionObjects = options.map(({ value, label }, index) => {
    const textObject = ex.text(component, { fill: 'white' }, label)
    textObject.y = 50 + index * 30
    ex.makeClickable(textObject, () => {
      onClick(value)
    })
    return { textObject, value }
  })

  const render = (selectedValue: string): void => {
    for (const { textObject, value } of optionObjects) {
      textObject.style.fill = value === selectedValue ? 'red' : 'white'
    }
  }

  render(options[0].value)

  return [component, render]
}

export default select
