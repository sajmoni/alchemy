import { createStoredValue } from 'typed-ls'

import { Language, Scene } from '~/enum'

export const language = createStoredValue<string>('language', Language.EN.code)

export const scene = createStoredValue<Scene>('scene', Scene.MAIN_MENU)
