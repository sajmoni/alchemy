const component = require('./component')
const scene = require('./scene')
const constant = require('./constant')
const data = require('./data')
const lab = require('./lab')
const effect = require('./effect')

module.exports = (plop) => {
  plop.setGenerator('component', component)
  plop.setGenerator('scene', scene)
  plop.setGenerator('constant', constant)
  plop.setGenerator('data', data)
  plop.setGenerator('lab', lab)
  plop.setGenerator('effect', effect)
}
