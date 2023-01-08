import { Instance } from 'l1'
import Worker from '../worker?worker'
import { MessageType } from '~/enum/app'

const initializeWorker = (l1: Instance): void => {
  const worker = new Worker()

  worker.postMessage({
    type: MessageType.TO_WORKER.INITIALIZE_WORKER,
  })

  l1.forever(() => {
    worker.postMessage({
      type: MessageType.TO_WORKER.UPDATE,
      payload: {},
    })
  }, 1)

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
