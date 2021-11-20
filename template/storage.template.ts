const keyPrefix = '{{ projectName }}'

const prefixKey = (key: string): string => `${keyPrefix}.${key}`

export const set = (key: string, object: any): void => {
  localStorage.setItem(prefixKey(key), JSON.stringify(object))
}

export const get = (key: string): unknown => {
  const restored = localStorage.getItem(prefixKey(key))
  return restored ? JSON.parse(restored) : null
}

export const remove = (key: string): void => {
  localStorage.removeItem(prefixKey(key))
}

export const clear = (): void => {
  localStorage.clear()
}
