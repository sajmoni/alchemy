export const createCommand = <Payload>(
  command: string,
  defaultValue: Payload,
) => {
  return {
    get: (): Payload => {
      return get(command) ?? defaultValue
    },
    set: (payload: Payload) => {
      set(command, payload)
    },
    remove: () => {
      remove(command)
    },
  }
}

const set = <Key extends string, Payload>(key: Key, payload: Payload): void => {
  localStorage.setItem(key, JSON.stringify(payload))
}

const get = <Key extends string, Value>(key: Key): Value | undefined => {
  const restored = localStorage.getItem(key)
  return restored ? (JSON.parse(restored) as Value) : undefined
}

const remove = <Key extends string>(key: Key): void => {
  localStorage.removeItem(key)
}
