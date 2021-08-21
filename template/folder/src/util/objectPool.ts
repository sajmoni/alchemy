import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

const _animatedSprites: PIXI.AnimatedSprite[] = []
const _sprites: PIXI.Sprite[] = []
const _containers: PIXI.Container[] = []
const _graphics: PIXI.Graphics[] = []
const _texts: PIXI.Text[] = []

type ObjectPoolOptions = {
  readonly animatedSprites?: number
  readonly sprites?: number
  readonly containers?: number
  readonly graphics?: number
  readonly texts?: number
}

/**
 * Create all your Pixi object before your game starts
 */
const initializeObjectPool = ({
  animatedSprites = 100,
  sprites = 100,
  containers = 100,
  graphics = 100,
  texts = 100,
}: ObjectPoolOptions = {}): void => {
  for (let index = 0; index < animatedSprites; index++) {
    const as = new PIXI.AnimatedSprite([ex.getTexture('square1-0')])
    _animatedSprites.push(as)
  }

  for (let index = 0; index < sprites; index++) {
    const s = new PIXI.Sprite()
    _sprites.push(s)
  }

  for (let index = 0; index < containers; index++) {
    const c = new PIXI.Container()
    _containers.push(c)
  }

  for (let index = 0; index < graphics; index++) {
    const g = new PIXI.Graphics()
    _graphics.push(g)
  }

  for (let index = 0; index < texts; index++) {
    const t = new PIXI.Text('')
    _texts.push(t)
  }
}

export const getAnimatedSprite = (): PIXI.AnimatedSprite => {
  const as = _animatedSprites.pop()
  if (as) {
    return as
  }

  console.warn(
    'Created new PIXI.AnimatedSprite. You should probably increase the AnimatedSprite object pool!',
  )

  const newAnimatedSprite = new PIXI.AnimatedSprite([
    ex.getTexture('square1-0'),
  ])
  return newAnimatedSprite
}

export const getSprite = (): PIXI.Sprite => {
  const s = _sprites.pop()
  if (s) {
    return s
  }

  console.warn(
    'Created new PIXI.Sprite. You should probably increase the Sprite object pool!',
  )

  const newSprite = new PIXI.Sprite()
  return newSprite
}

export const getText = (): PIXI.Text => {
  const t = _texts.pop()
  if (t) {
    return t
  }

  console.warn(
    'Created new PIXI.Text. You should probably increase the Text object pool!',
  )
  const newText = new PIXI.Text('')
  return newText
}

/**
 * When done with an object, put it back into the pool
 */
export const putBack = (container: PIXI.Container): void => {
  if (container instanceof PIXI.AnimatedSprite) {
    _animatedSprites.push(container)
  } else if (container instanceof PIXI.Sprite) {
    _sprites.push(container)
  } else if (container instanceof PIXI.Text) {
    _texts.push(container)
  } else if (container instanceof PIXI.Graphics) {
    _graphics.push(container)
  } else if (container instanceof PIXI.Container) {
    _containers.push(container)
  }
}

export default initializeObjectPool
