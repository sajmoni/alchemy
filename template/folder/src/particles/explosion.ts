import * as ex from 'pixi-ex'
import { EmitterConfigV3 } from '@pixi/particle-emitter'

const explosion = (): EmitterConfigV3 => ({
  lifetime: {
    min: 0.8,
    max: 0.8,
  },
  particlesPerWave: 8,
  frequency: 0.2,
  emitterLifetime: 0.41,
  autoUpdate: true,
  maxParticles: 1000,
  addAtBack: false,
  pos: {
    x: 0,
    y: 0,
  },
  behaviors: [
    {
      type: 'alpha',
      config: {
        alpha: {
          list: [
            {
              time: 0,
              value: 0.8,
            },
            {
              time: 1,
              value: 0.7,
            },
          ],
        },
      },
    },
    {
      type: 'moveSpeedStatic',
      config: {
        min: 200,
        max: 200,
      },
    },
    {
      type: 'scale',
      config: {
        scale: {
          list: [
            {
              time: 0,
              value: 1,
            },
            {
              time: 1,
              value: 0.3,
            },
          ],
        },
        minMult: 1,
      },
    },
    {
      type: 'color',
      config: {
        color: {
          list: [
            {
              time: 0,
              value: 'e3f9ff',
            },
            {
              time: 1,
              value: '0ec8f8',
            },
          ],
        },
      },
    },
    {
      type: 'spawnBurst',
      config: {
        start: 0,
        spacing: 45,
        distance: 0,
      },
    },
    {
      type: 'textureSingle',
      config: {
        texture: ex.getTexture('square-1'),
      },
    },
  ],
})

export default explosion
