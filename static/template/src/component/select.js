import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import { container, text } from '../pixi'

export default ({languages, onClick }) => {
  const component = container()
  
  const title = text('Choose language')
  component.addChild(title)
  
  const languageObjects = languages.map(({ code, label }, index) => {
    const textObject = text(label)
    textObject.y = 50 + index * 30
    ex.makeClickable(textObject, () => {
      onClick(code)
    })
    component.addChild(textObject)
    return { textObject, languageCode: code }
  })
  
  const render = (selectedLanguage) => {
    languageObjects.forEach(({ textObject, languageCode}) => {
      if (languageCode === selectedLanguage) {
        textObject.style.fill = 'red'
      } else {
        textObject.style.fill = 'white'
      }
    })
  }

  return [component, render]
}
