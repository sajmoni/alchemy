import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import { container, text } from '/pixi'

type render = (selectedValue: string) => void

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
}: SelectOptions): [PIXI.Container, render] => {
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

  const render = (selectedValue: string) => {
    optionObjects.forEach(({ textObject, value }) => {
      if (value === selectedValue) {
        textObject.style.fill = 'red'
      } else {
        textObject.style.fill = 'white'
      }
    })
  }

  render(options[0].value)

  return [component, render]
}

export default select
