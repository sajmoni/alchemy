import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'

/* PLOP_INJECT_IMPORT */
import componentLab from './lab/component'

const lab = {
  /* PLOP_INJECT_LAB */
  components: componentLab,
}

const initializeLabs = (lab: Record<string, (Lab) => void>) => {
  ReactDOM.render(<App lab={lab} />, document.querySelector('#lab'))
}

initializeLabs(lab)
