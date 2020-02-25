import * as ex from 'pixi-ex'

// * Make game fullscreen and resize when window is resized
export default () => {
  const resizeGame = () => {
    // const game = document.getElementById('container')
    // game.style.height = `${window.innerHeight}px`

    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    ex.resize(screenWidth, screenHeight)
  }

  window.addEventListener('resize', resizeGame)
  resizeGame()
}
