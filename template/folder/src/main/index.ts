import * as l1 from 'l1'

import MessageType from '../constant/messageType'

const initializeGame = () => {
  // The worker is built separately so this path is the built path
  const worker = new Worker('./worker/index.js')

  worker.postMessage({
    type: MessageType.TO_WORKER.INITIALIZE_WORKER,
  })

  l1.forever(() => {
    worker.postMessage({
      type: MessageType.TO_WORKER.UPDATE,
      payload: {},
    })
  })

  // eslint-disable-next-line unicorn/prefer-add-event-listener
  worker.onmessage = ({ data: { type, payload } }) => {
    switch (type) {
      case MessageType.FROM_WORKER.WORKER_INITIALIZED:
        console.log('main: worker initialized', payload)
        break

      default:
        break
    }
  }
}

export default initializeGame
