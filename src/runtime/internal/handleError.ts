import type { InternalState } from '../type.js'

export default function handleError<SceneKey extends string>(
  internalState: InternalState<SceneKey>,
  label: string,
  error: any,
): void {
  internalState.error = `${label}: ${error.message as string}`
  console.error(`${label}:`, error)
}
