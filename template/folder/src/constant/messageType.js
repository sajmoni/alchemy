const TO_WORKER = {
  INITIALIZE_WORKER: 'initializeWorker',
  UPDATE: 'update',
}
const FROM_WORKER = {
  UPDATE: 'update',
  DEBUG: 'debug',
  WORKER_INITIALIZED: 'workerInitialized',
}

const MessageType = {
  TO_WORKER,
  FROM_WORKER,
}

export default MessageType
