import * as l1 from 'l1'

import Worker from '../worker/index.ts?worker'
import MessageType from '/enum/messageType'

const initializeWorker = (): void => {
  // The worker is built separately so this path is the built path
  const worker = new Worker()

  worker.postMessage({
    type: MessageType.TO_WORKER.INITIALIZE_WORKER,
  })

  l1.forever(() => {
    worker.postMessage({
      type: MessageType.TO_WORKER.UPDATE,
      payload: {},
    })
  })

  worker.addEventListener('message', ({ data: { type, payload } }) => {
    switch (type) {
      case MessageType.FROM_WORKER.WORKER_INITIALIZED:
        console.log('main: worker initialized', payload)
        break

      default:
        break
    }
  })
}

export default initializeWorker
