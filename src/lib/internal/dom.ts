import type { Application } from 'pixi.js'

export default function initializeDOM({ app }: { app: Application }): void {
  const containerElement = document.createElement('div')
  containerElement.style.height = '100vh'
  containerElement.style.display = 'flex'
  containerElement.style.justifyContent = 'center'
  containerElement.style.alignItems = 'center'
  document.body.appendChild(containerElement)

  const gameElement = document.createElement('div')

  gameElement.append(app.renderer.view as HTMLCanvasElement)
  // Prevent default browser right-click behavior
  gameElement.setAttribute('oncontextmenu', 'return false;')

  gameElement.style.width = `${app.renderer.width}px`
  gameElement.style.height = `${app.renderer.height}px`

  containerElement.appendChild(gameElement)
}
