import type { AlchemyState } from '../type'

export default function handleError<SceneKey extends string>(
  alchemyState: AlchemyState<SceneKey>,
  label: string,
  error: any,
): void {
  alchemyState.error = `${label}: ${error.message as string}`
  console.error(`${label}:`, error)
}
