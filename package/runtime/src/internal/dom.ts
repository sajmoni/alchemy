import type { Application } from 'pixi.js'

export default function initializeDOM({ app }: { app: Application }): void {
  const containerElement = document.createElement('div')
  containerElement.style.height = '100vh'
  containerElement.style.display = 'flex'
  containerElement.style.justifyContent = 'center'
  containerElement.style.alignItems = 'center'
  document.body.appendChild(containerElement)

  const gameElement = document.createElement('div')

  gameElement.append(app.canvas)
  // Prevent default browser right-click behavior
  gameElement.setAttribute('oncontextmenu', 'return false;')

  containerElement.appendChild(gameElement)
}
