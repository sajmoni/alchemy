import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

export const sprite = (textureName: string): PIXI.Sprite => {
  const s = new PIXI.Sprite(ex.getTexture(textureName))
  s.anchor.set(0.5)
  return s
}

export const animatedSprite = (
  textureNames: readonly string[],
): PIXI.AnimatedSprite => {
  // @ts-ignore
  const a = new PIXI.AnimatedSprite(textureNames.map(ex.getTexture))
  a.anchor.set(0.5)
  a.animationSpeed = 0.02
  a.play()
  return a
}

export const text = (
  string: string,
  textStyle: PIXI.TextStyle = undefined,
): PIXI.Text => {
  const t = new PIXI.Text(string, textStyle)
  t.anchor.set(0.5)
  ex.makeResizable(t)
  return t
}

export const graphics = (): PIXI.Graphics => {
  const g = new PIXI.Graphics()
  return g
}

export const container = (): PIXI.Container => {
  const c = new PIXI.Container()
  return c
}
