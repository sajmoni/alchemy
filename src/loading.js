const loading = document.createElement('div')
loading.innerHTML = 'loading...'
loading.setAttribute('id', 'loading')
document.getElementById('game')
  .appendChild(loading)

document.addEventListener('DOMContentLoaded', () => {
  loading.remove()
})
