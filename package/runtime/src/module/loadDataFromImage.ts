import { times2d } from 'tiny-toolkit'

// R-G-B
export type Pixel = `${number}-${number}-${number}`

/**
 * This function can be used to for example load a level from image data
 */
export async function loadDataFromImage(imagePath: string): Promise<{
  pixels: Pixel[]
  width: number
  height: number
}> {
  return new Promise((resolve) => {
    let img = new window.Image()
    img.src = imagePath
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const context2d = canvas.getContext('2d') as CanvasRenderingContext2D
      context2d.drawImage(img, 0, 0)
      const { data } = context2d.getImageData(0, 0, canvas.width, canvas.height)
      let pixelArray: Pixel[] = []

      times2d(canvas.width, canvas.height, (_x, _y, pixel) => {
        const position = pixel * 4

        const red = data[position]!
        const green = data[position + 1]!
        const blue = data[position + 2]!
        // Ignore alpha
        // const alpha = data[position+3]!
        pixelArray.push(`${red}-${green}-${blue}`)
      })

      resolve({
        pixels: pixelArray,
        width: canvas.width,
        height: canvas.height,
      })
    }
  })
}
