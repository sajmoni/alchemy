import ReactDOM from 'react-dom'
import React from 'react'

import App from './App'
import { Lab } from './type'

const initializeLabs = (labData: Record<string, (lab: Lab) => void>): void => {
  ReactDOM.render(<App labData={labData} />, document.querySelector('#labs'))
}

export default initializeLabs
