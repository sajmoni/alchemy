// Shows a simple loading screen before the game has loaded
export default function showLoadingScreen() {
  const element = document.createElement('div')
  element.style.color = 'white'
  element.style.display = 'flex'
  element.style.justifyContent = 'center'
  element.style.alignItems = 'center'
  element.style.height = '100vh'
  element.style.fontSize = '26px'
  element.innerText = 'Loading...'

  document.body.appendChild(element)

  document.addEventListener('DOMContentLoaded', () => {
    element.remove()
  })
}
