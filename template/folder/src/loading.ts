// Shows a simple loading screen before the game has loaded
const loading = () => {
  const element = document.querySelector('#loading')
  if (!element) {
    throw new Error(`Couldn't find element: #loading`)
  }

  document.addEventListener('DOMContentLoaded', () => {
    element.remove()
  })
}

loading()

export {}
