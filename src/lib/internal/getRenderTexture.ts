import {
  Application,
  // BaseRenderTexture,
  // SCALE_MODES,
  RenderTexture,
} from 'pixi.js'

const getRenderTexture = (_app: Application) => {
  // TODO: Figure this one out
  // const baseRenderTexture = new BaseRenderTexture({
  //   width: app.renderer.width,
  //   height: app.renderer.height,
  //   scaleMode: SCALE_MODES.NEAREST,
  //   resolution: app.renderer.resolution,
  // })
  const renderTexture = new RenderTexture()
  return renderTexture
}

export default getRenderTexture
