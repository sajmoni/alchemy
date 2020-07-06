import { MessageType } from '/constant'

onmessage = ({ data: { type, payload: _ } }) => {
  switch (type) {
    case MessageType.TO_WORKER.INITIALIZE_WORKER:
      // @ts-ignore
      postMessage({
        type: MessageType.FROM_WORKER.WORKER_INITIALIZED,
        payload: { hello: 'world' },
      })
      break

    default:
      break
  }
}
