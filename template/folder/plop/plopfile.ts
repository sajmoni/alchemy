import component from './component'
import scene from './scene'
import constant from './constant'
import data from './data'
import lab from './lab'
import effect from './effect'
import particles from './particles'

module.exports = (plop): void => {
  plop.setGenerator('Component', component)
  plop.setGenerator('Scene', scene)
  plop.setGenerator('Constant', constant)
  plop.setGenerator('Data', data)
  plop.setGenerator('Lab', lab)
  plop.setGenerator('Effect', effect)
  plop.setGenerator('Particles', particles)
}
