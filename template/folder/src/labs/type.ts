import { Application, Container } from 'pixi.js'
import { TextureMap } from '~/type/app'

export type Lab = {
  app: Application
  container: Container
  textures: TextureMap
}
