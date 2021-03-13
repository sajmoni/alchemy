import ui from './ui'
import scene from './scene'
import enumGenerator from './enum'
import lab from './lab'
import effect from './effect'
import particles from './particles'

module.exports = (plop): void => {
  plop.setGenerator('UI component', ui)
  plop.setGenerator('Scene', scene)
  plop.setGenerator('Enum', enumGenerator)
  plop.setGenerator('Lab', lab)
  plop.setGenerator('Effect', effect)
  plop.setGenerator('Particles', particles)
}
