import { getTextures as getTexturesEx } from 'pixi-ex'

import textureData from '~/public/asset/spritesheet/data.json'

// TODO: Move to tiny-toolkit.

/**
 * CreateTypeFromObject<typeof anyObject>
 * Only the keys:
 * CreateTypeFromObject<keyof typeof anyObject>
 */
type CreateTypeFromObject<T> = {
  [P in keyof T]: T[P] extends string ? T[P] : never
}

const getTextures = (
  textureNames: Array<CreateTypeFromObject<keyof typeof textureData.frames>>,
) => getTexturesEx(textureNames)

export default getTextures
