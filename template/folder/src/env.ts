export type Env = {
  DEBUG: boolean
  VERSION: string
  NODE_ENV: 'development' | 'production'
}

const production: Env = {
  DEBUG: false,
  VERSION: 'not set',
  NODE_ENV: 'production',
}

const development: Env = {
  DEBUG: true,
  VERSION: 'not set',
  NODE_ENV: 'development',
}

const useProductionOrDevelopment = (): Env => {
  // eslint-disable-next-line node/prefer-global/process
  if (process.env.NODE_ENV === 'production') {
    return production
  }

  return development
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export default useProductionOrDevelopment()
