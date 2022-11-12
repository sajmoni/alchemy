import { MessageType } from '~/enum/app'

onmessage = ({ data: { type, payload: _ } }): void => {
  switch (type) {
    case MessageType.TO_WORKER.INITIALIZE_WORKER:
      postMessage({
        type: MessageType.FROM_WORKER.WORKER_INITIALIZED,
        payload: { hello: 'world' },
      })
      break

    default:
      break
  }
}
