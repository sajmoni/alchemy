/**
 * items: [{
 *  label: getData
 * }]
 */
export default (items, options = {}) => {
  const {
    element: appendTo = document.body,
    // width = 200,
  } = options

  const container = document.createElement('div')
  appendTo.appendChild(container)
  container.style.backgroundColor = 'rgba(0,0,0,0.8)'
  container.style.position = 'absolute'
  container.style.top = '0px'
  container.style.padding = '10px'
  container.style.zIndex = '1'
  container.style.color = 'white'
  container.style.fontFamily = 'Helvetica'
  container.style.userSelect = 'none'
  // container.style.width = `${width}px`

  const elements = Object.entries(items).map(([key, getData]) => {
    const element = document.createElement('div')
    element.innerHTML = `${key}: ${getData() || '-'}`
    container.appendChild(element)
    return {
      key,
      getData,
      element,
    }
  })

  const render = () => {
    elements.forEach(({ key, getData, element }) => {
      // eslint-disable-next-line no-param-reassign
      element.innerHTML = `${key}: ${getData() || '-'}`
    })
  }
  return render
}
