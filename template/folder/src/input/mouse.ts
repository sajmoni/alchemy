import { Mouse } from '~/enum/app'

type Data = {
  x: number
  y: number
  button: Mouse
}

// TODO: Figure out the correct type here
const getDataFromEvent = (event: any): Data => {
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
