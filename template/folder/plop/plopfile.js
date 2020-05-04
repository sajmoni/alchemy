const component = require('./component')
const scene = require('./scene')

module.exports = (plop) => {
  plop.setGenerator('Component', component)
  plop.setGenerator('Scene', scene)
}
