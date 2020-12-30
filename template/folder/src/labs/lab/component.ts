import * as PIXI from 'pixi.js'
import { bar, slider, button, select } from '../../ui'
import { Lab } from '../type'

const component = ({ app, container }: Lab) => {
  // Bar
  let value = 1
  const [_bar, renderBar] = bar()
  app.ticker.add(() => {
    value = Math.max(0, value - 0.01)
    renderBar(value)
  })
  _bar.position.set(200, 50)
  container.addChild(_bar)

  // Slider
  let sliderValue = 1
  const [_slider, renderSlider] = slider({
    initialValue: sliderValue.toString(),
    onMinus: () => {
      sliderValue -= 1
      renderSlider(sliderValue.toString())
    },
    onPlus: () => {
      sliderValue += 1
      renderSlider(sliderValue.toString())
    },
  })
  _slider.position.set(200, 400)
  container.addChild(_slider)

  const [refresh] = button({
    label: 'refresh',
    onClick: () => {
      container.destroy()
      const newContainer = new PIXI.Container()
      app.stage.addChild(newContainer)
      component({ app, container: newContainer })
    },
    textStyle: new PIXI.TextStyle({ fill: 'white' }),
  })
  refresh.position.set(10, 10)
  container.addChild(refresh)

  let selectedValue = '1'
  const [_select, renderSelect] = select({
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
    ],
    title: 'Select option',
    onClick: (value) => {
      selectedValue = value
      renderSelect(selectedValue)
    },
  })
  _select.position.set(400, 400)
  container.addChild(_select)
}

export default component
