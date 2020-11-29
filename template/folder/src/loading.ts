// Shows a simple loading screen before the game has loaded

const loading = document.createElement('div')
loading.innerHTML = 'Please wait'
loading.style.fontFamily = 'Helvetica'
loading.setAttribute('id', 'loading')

const SELECTOR = '#game'
const element = document.querySelector(SELECTOR)
if (!element) {
  throw new Error(`Couldn't find element: ${SELECTOR}`)
}

element.append(loading)

document.addEventListener('DOMContentLoaded', () => {
  loading.remove()
})
