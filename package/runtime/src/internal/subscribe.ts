import { subscribe as valtioSubscribe } from 'valtio'

/**
 * Same as subscribe but it also calls the callback once
 *
 * This allows you to define state first and then add the subscribers and the states will still be in sync
 * 
 * Also auto-unsubscribes when you change scenes
 */
export default function createSubscribe(list: Array<() => void>) {
  return function subscribe<T extends object>(
    proxyObject: T,
    // This doesn't expose the ops argument. It's not well documented why you would need this
    callback: () => void,
    notifyInSync?: boolean,
  ): () => void {
    callback()
    const unsubscribe = valtioSubscribe(proxyObject, callback, notifyInSync)
    list.push(unsubscribe)
    return unsubscribe
  }
}
