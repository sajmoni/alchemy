const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs-extra')

module.exports = ({ appName, rootPath }) => {
  let didInit = false
  try {
    execSync(`git init ${appName}`, { stdio: 'ignore' })
    didInit = true

    execSync(`git -C ${appName}/ add -A`, { stdio: 'ignore' })

    execSync(`git -C ${appName}/ commit -m "Initial commit from Make Web Game"`, {
      stdio: 'ignore',
    })

    execSync(`git -C ${appName}/ branch release`, { stdio: 'ignore' })

    console.log()
    console.log('Initialized a git repository.')
  } catch (e) {
    if (didInit) {
      // If we successfully initialized but couldn't commit,
      // maybe the commit author config is not set.
      // Remove the Git files to avoid a half-done state.
      // TODO: Test this by adding to use-cases file
      try {
        fs.removeSync(path.join(rootPath, '.git'))
      } catch (removeErr) {
        // Ignore.
      }
    }
  }
}
