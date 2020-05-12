import * as PIXI from 'pixi.js'

type Data = {
  x: number
  y: number
  // TODO: Use constant/mouse.js as enum
  button: number
}

const getDataFromEvent = (event: PIXI.interaction.InteractionEvent) => {
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
