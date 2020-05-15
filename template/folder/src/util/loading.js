// Shows a simple loading screen before the game has loaded

const loading = document.createElement('div')
loading.innerHTML = 'Please wait'
loading.style.fontFamily = 'Helvetica'
loading.setAttribute('id', 'loading')
document.querySelector('#game').append(loading)

document.addEventListener('DOMContentLoaded', () => {
  loading.remove()
})
