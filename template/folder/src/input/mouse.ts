import * as PIXI from 'pixi.js'

import { Mouse } from '/enum'

type Data = {
  x: number
  y: number
  button: Mouse
}

const getDataFromEvent = (event: PIXI.InteractionEvent): Data => {
  const {
    data: {
      global: { x, y },
      button,
    },
  } = event

  return {
    x,
    y,
    button,
  }
}

export default getDataFromEvent
