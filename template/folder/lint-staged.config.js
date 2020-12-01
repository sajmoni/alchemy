const fs = require('fs')

/**
 * Generate a temporary tsconfig to enable lint-staged to pass staged files
 * @param {string[]} stagedFilenames
 */
const typeCheckStagedFiles = (stagedFilenames) => {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'))
  tsconfig.include = [...stagedFilenames]
  fs.writeFileSync('tsconfig.lint.json', JSON.stringify(tsconfig, null, 2))
  return 'tsc --project tsconfig.lint.json'
}

module.exports = {
  'src/**/*.{js,ts,tsx}?(x)': typeCheckStagedFiles,
  'src/**/*.{js,ts,tsx,md}': 'xo --fix',
}
