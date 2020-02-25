import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

// * Convenience functions
export const sprite = (texture) => {
  const s = new PIXI.Sprite(ex.getTexture(texture))
  s.anchor.set(0.5)
  return s
}

export const animatedSprite = (textures) => {
  const a = new PIXI.AnimatedSprite(textures.map(ex.getTexture))
  a.anchor.set(0.5)
  return a
}

export const text = (string, textStyle) => {
  const t = new PIXI.Text(string, textStyle)
  t.anchor.set(0.5)
  ex.makeResizable(t)
  return t
}

export const graphics = () => {
  const g = new PIXI.Graphics()
  return g
}

export const container = () => {
  const c = new PIXI.Container()
  return c
}
