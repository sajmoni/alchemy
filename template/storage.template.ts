const keyPrefix = '{{ projectName }}'

const { localStorage } = window

const prefixKey = (key: string) => `${keyPrefix}.${key}`

// TODO: Rename to set
export const save = (key: string, object: any) => {
  localStorage.setItem(prefixKey(key), JSON.stringify(object))
}

// TODO: Rename to get
export const restore = (key: string): any => {
  const restored = localStorage.getItem(prefixKey(key))
  return restored ? JSON.parse(restored) : null
}

export const remove = (key: string) => {
  localStorage.removeItem(prefixKey(key))
}

// TODO: Add clear
