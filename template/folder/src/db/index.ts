import { createCommand } from 'typed-ls'

import { Language, Scene } from '~/enum'

export const language = createCommand<string>('language', Language.EN.code)

export const scene = createCommand<Scene>('scene', Scene.MAIN_MENU)
