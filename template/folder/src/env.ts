export type Env = {
  DEBUG: boolean
  VERSION?: string
  NODE_ENV: 'development' | 'production'
}

const production: Env = {
  DEBUG: false,
  VERSION: undefined,
  NODE_ENV: 'production',
}

const development: Env = {
  DEBUG: true,
  VERSION: undefined,
  NODE_ENV: 'development',
}

const useProductionOrDevelopment = (): Env => {
  if (import.meta.env.MODE === 'production') {
    return production
  }

  return development
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useProductionOrDevelopment()
