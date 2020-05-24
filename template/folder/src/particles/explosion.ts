import { EmitterConfig } from 'pixi-particles'

const explosion = (): EmitterConfig => ({
  alpha: {
    list: [
      {
        value: 0.8,
        time: 0,
      },
      {
        value: 0.1,
        time: 1,
      },
    ],
    isStepped: false,
  },
  scale: {
    list: [
      {
        value: 1,
        time: 0,
      },
      {
        value: 0.3,
        time: 1,
      },
    ],
    isStepped: false,
  },
  color: {
    list: [
      {
        value: 'fb1010',
        time: 0,
      },
      {
        value: 'f5b830',
        time: 1,
      },
    ],
    isStepped: false,
  },
  speed: {
    list: [
      {
        value: 200,
        time: 0,
      },
      {
        value: 100,
        time: 1,
      },
    ],
    isStepped: false,
  },
  startRotation: {
    min: 0,
    max: 360,
  },
  rotationSpeed: {
    min: 0,
    max: 0,
  },
  lifetime: {
    min: 0.5,
    max: 0.5,
  },
  frequency: 0.008,
  spawnChance: 1,
  particlesPerWave: 1,
  emitterLifetime: 0.31,
  maxParticles: 1000,
  pos: {
    x: 0,
    y: 0,
  },
  addAtBack: false,
  spawnType: 'circle',
  spawnCircle: {
    x: 0,
    y: 0,
    r: 10,
  },
})

export default explosion
