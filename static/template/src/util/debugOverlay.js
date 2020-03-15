/**
 * items: [{
 *  label,
 *  getData,
 *  threshold,
 *  type: 'label' | 'button',
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

  const elements = items.map(({ label, getData, threshold }) => {
    const element = document.createElement('div')
    element.innerHTML = `${label}: ${getData() || '-'}`
    container.appendChild(element)
    return {
      label,
      getData,
      element,
      threshold,
    }
  })

  const render = () => {
    elements.forEach(({
      label, getData, element, threshold,
    }) => {
      const data = getData()
      element.innerHTML = `${label}: ${data || '-'}`
      if (threshold && data >= threshold) {
        element.style.color = 'red'
      } else {
        element.style.color = 'white'
      }
    })
  }
  return render
}
