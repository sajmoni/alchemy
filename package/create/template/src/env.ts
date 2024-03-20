export type Env = {
  DEV: boolean
}

const production: Env = {
  DEV: false,
}

const development: Env = {
  DEV: true,
}

const useProductionOrDevelopment = (): Env => {
  if (import.meta.env.MODE === 'production') {
    return production
  }

  return development
}

export default useProductionOrDevelopment()
