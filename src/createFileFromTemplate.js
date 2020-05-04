const fs = require('fs-extra')
const Mustache = require('mustache')

const createFileFromTemplate = ({ source, destination, options }) => {
  const templateString = fs
    .readFileSync(`${__dirname}/template/${source}`)
    .toString()
  const file = Mustache.render(templateString, options)
  fs.writeFileSync(destination, file)
}

module.exports = createFileFromTemplate
