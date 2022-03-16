export type Env = {
  DEBUG: boolean
  NODE_ENV: 'development' | 'production'
}

const production: Env = {
  DEBUG: false,
  NODE_ENV: 'production',
}

const development: Env = {
  DEBUG: true,
  NODE_ENV: 'development',
}

const useProductionOrDevelopment = (): Env => {
  if (import.meta.env.MODE === 'production') {
    return production
  }

  return development
}

export default useProductionOrDevelopment()
