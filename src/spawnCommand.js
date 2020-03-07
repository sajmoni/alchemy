const spawn = require('cross-spawn')

module.exports = ({ command, args }) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' })

    child.on('close', code => {
      if (code !== 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          command: `${command} ${args.join(' ')}`,
        })
      }
      resolve()
    })
  })
