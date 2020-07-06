const fs = require('fs-extra')
const Mustache = require('mustache')
const path = require('path')

const createFileFromTemplate = ({ source, destination, options }) => {
  const templateString = fs
    .readFileSync(path.join(__dirname, `/template/${source}`))
    .toString()
  const file = Mustache.render(templateString, options)
  fs.writeFileSync(destination, file)
}

module.exports = createFileFromTemplate
