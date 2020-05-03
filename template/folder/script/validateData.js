#!/usr/bin/env node

const fs = require('fs')
const _ = require('lodash/fp')
const chalk = require('chalk')

const DATA_DIRECTORY = 'src/data'

const files = fs.readdirSync(DATA_DIRECTORY)

const validationErrors = []

const validate = ({ data, schema, fileName }) => {
  if (!schema) {
    console.log()
    console.error(` No schema defined for ${chalk.bold(fileName)}`)
    console.log()
    process.exit(1)
  }

  if (!data) {
    console.log()
    console.error(
      ` No data defined for ${chalk.bold(
        fileName,
      )}. Data needs to be the default export!`,
    )
    console.log()
    process.exit(1)
  }

  // @ts-ignore
  _.mapValues.convert({ cap: false })((value, key) => {
    try {
      schema.validateSync(value, { strict: true })
    } catch (error) {
      validationErrors.push(`${chalk.bold(fileName)} ${key}: ${error.errors}`)
    }
  })(data)
}

files.forEach((fileName) => {
  const file = require(`../${DATA_DIRECTORY}/${fileName}`)
  validate({ schema: file.schema, data: file.default, fileName })
})

if (validationErrors.length === 0) {
  console.log()
  console.log(` ${chalk.green('All data is valid!')}`)
  console.log()
} else {
  console.log()
  console.log(` ${chalk.red('Validation errors!')}`)
  console.log()
  validationErrors.forEach((validationError) => {
    console.log(`   ${validationError}`)
  })
  console.log()
  process.exit(1)
}
