import { arrowKeys } from 'alchemy-engine'

import game from './scene/game/index.js'
import mainMenu from './scene/mainMenu.js'

export const scenes = {
  game,
  mainMenu,
}

export const keys = ['a', 'w', 's', 'd', ...arrowKeys, 'Space'] as const

export const TextStyle = {
  MAIN: {
    fontFamily: 'Press Start 2P',
    fill: 'white',
    fontSize: 12,
  },
} as const
