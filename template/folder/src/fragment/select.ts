import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import { container, text } from '~/pixi'
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
  const component = container()

  const titleText = text(title, new PIXI.TextStyle({ fill: 'white' }))
  component.addChild(titleText)

  const optionObjects = options.map(({ value, label }, index) => {
    const textObject = text(label, new PIXI.TextStyle({ fill: 'white' }))
    textObject.y = 50 + index * 30
    ex.makeClickable(textObject, () => {
      onClick(value)
    })
    component.addChild(textObject)
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
