import { Language, Scene } from '~/enum'
import { createCommand } from '~/util/storage'

export const language = createCommand<string>('language', Language.EN.code)

export const scene = createCommand<Scene>('scene', Scene.MAIN_MENU)
