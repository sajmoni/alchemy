import state from '/state'

const handleError = (label: string, error: any): void => {
  state.application.error = `${label}: ${error.message}`
  console.error(`${label}: `, error)
}

export default handleError
