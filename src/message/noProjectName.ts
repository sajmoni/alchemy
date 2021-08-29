import chalk from 'chalk'

const noProjectName = ({ programName }: { programName: string }) => {
  console.log()
  console.error('Please specify the project directory:')
  console.log(
    `  ${chalk.cyan(programName)} ${chalk.green('<project-directory>')}`,
  )
  console.log()
  console.log('For example:')
  console.log(`  ${chalk.cyan(programName)} ${chalk.green('my-web-game')}`)
  console.log()
  console.log(`Run ${chalk.cyan(`${programName} --help`)} to see all options.`)
  console.log()
}

export default noProjectName
