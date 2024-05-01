import { subscribeKey as valtioSubscribeKey } from 'valtio/utils'

/**
 * Same as subscribeKey but it also calls the callback once
 *
 * This allows you to define state first and then add the subscribers and the states will still be in sync
 */
export default function createSubscribeKey(list: Array<() => void>) {
  return function subscribeKey<T extends object, K extends keyof T>(
    proxyObject: T,
    key: K,
    callback: (value: T[K]) => void,
  ): () => void {
    callback(proxyObject[key])
    const unsubscribe = valtioSubscribeKey(proxyObject, key, callback)
    list.push(unsubscribe)
    return unsubscribe
  }
}
