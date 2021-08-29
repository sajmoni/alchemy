import fs from 'fs-extra'
import Mustache from 'mustache'

const createFileFromTemplate = ({
  source,
  destination,
  options,
}: {
  source: string
  destination: string
  options: any
}) => {
  const templateString = fs.readFileSync(source).toString()
  const file = Mustache.render(templateString, options)
  fs.writeFileSync(destination, file)
}

export default createFileFromTemplate
