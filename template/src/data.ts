import { arrowKeys } from 'alchemy-engine'

import game from './scene/game'
import mainMenu from './scene/mainMenu'

export const scenes = {
  game,
  mainMenu,
}

export const keys = ['a', 'w', 's', 'd', ...arrowKeys, 'Space'] as const

export const state = {
  settingsVisible: false,
}
export type State = typeof state

export const TextStyle = {
  MAIN: {
    fontFamily: 'Press Start 2P',
    fill: 'white',
    fontSize: 12,
  },
} as const
