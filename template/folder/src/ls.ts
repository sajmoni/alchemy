import { createStoredValue } from 'typed-ls'

import { Language, Scene } from '~/enum'

export const language = createStoredValue('language', Language.EN.code)

export const soundVolume = createStoredValue('soundVolume', 5)

export const musicVolume = createStoredValue('musicVolume', 5)

export const scene = createStoredValue('scene', Scene.MAIN_MENU)
