import * as PIXI from 'pixi.js'

export default (app) => {
  const component = new PIXI.Text('Component', { fill: 'white' })
  app.stage.addChild(component)
}
