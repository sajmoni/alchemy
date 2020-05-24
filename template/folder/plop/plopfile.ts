const component = require('./component')
const scene = require('./scene')
const constant = require('./constant')
const data = require('./data')
const lab = require('./lab')
const effect = require('./effect')
const particles = require('./particles')

module.exports = (plop) => {
  plop.setGenerator('Component', component)
  plop.setGenerator('Scene', scene)
  plop.setGenerator('Constant', constant)
  plop.setGenerator('Data', data)
  plop.setGenerator('Lab', lab)
  plop.setGenerator('Effect', effect)
  plop.setGenerator('Particles', particles)
}
