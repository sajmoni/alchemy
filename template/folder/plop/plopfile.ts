import fragment from './fragment'
import view from './view'
import scene from './scene'
import enumGenerator from './enum'
import lab from './lab'
import effect from './effect'

module.exports = (plop: any): void => {
  plop.setGenerator('Fragment', fragment)
  plop.setGenerator('View', view)
  plop.setGenerator('Scene', scene)
  plop.setGenerator('Enum', enumGenerator)
  plop.setGenerator('Lab', lab)
  plop.setGenerator('Effect', effect)
}
