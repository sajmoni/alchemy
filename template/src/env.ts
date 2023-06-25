export type Env = {
  NODE_ENV: 'development' | 'production'
}

const production: Env = {
  NODE_ENV: 'production',
}

const development: Env = {
  NODE_ENV: 'development',
}

const useProductionOrDevelopment = (): Env => {
  if (import.meta.env.MODE === 'production') {
    return production
  }

  return development
}

export default useProductionOrDevelopment()
