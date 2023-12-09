import type { Container } from 'pixi.js'

const logWithColor = (string: string) => {
  console.log(
    '%c' + string,
    // -webkit-text-stroke: 2px black;
    'color: #7289DA; font-size: 12px; font-weight: bold;',
  )
}

export default function logObject(object: Container): void {
  logWithColor(`== ${object.label ?? '(No label)'} ==`)
  console.log(object)
}
