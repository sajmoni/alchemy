import { Container } from 'pixi.js'
import * as ex from 'pixi-ex'

import { Fragment } from '~/type/app'

type Option = {
  value: string
  label: string
}

type SelectOptions = {
  options: Option[]
  onClick: (value: string) => void
}

const select = ({ options, onClick }: SelectOptions): Fragment<string> => {
  const component = new Container()

  const optionObjects = options.map(({ value, label }, index) => {
    const textObject = ex.text(component, { fill: 'white' }, label)
    textObject.y = 50 + index * 30
    ex.onClick(textObject, () => {
      onClick(value)
    })
    return { textObject, value }
  })

  const render = (selectedValue: string): void => {
    for (const { textObject, value } of optionObjects) {
      textObject.style.fill = value === selectedValue ? 'red' : 'white'
    }
  }

  if (options.length > 0) {
    render(options[0].value)
  }

  return [component, render]
}

export default select
