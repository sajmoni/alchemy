// Shows a simple loading screen before the game has loaded

const loading = document.createElement('div')
loading.innerHTML = 'Please wait'
loading.setAttribute('id', 'loading')
document.getElementById('game')
  .appendChild(loading)

document.addEventListener('DOMContentLoaded', () => {
  loading.remove()
})
