import * as l1 from 'l1'
import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import MainLoop from 'mainloop.js'
import renderPanel, {
  NumericValue,
  Button,
  Divider,
  Checkbox,
  Dropdown,
  StringValue,
} from 'nano-panel'
import * as prism from 'state-prism'
import React from 'react'

import app from './app'
import Sound from './sound'
import state from './state'
import { getAverageUpdateDuration, getAverageDrawDuration } from './loop'
import { Scene } from './constant'
import * as ls from './util/storage'

declare global {
  interface Window {
    debug: any
  }
}

const initializeDebugTools = () => {
  // * These commands can be run in the console, e.g: 'debug.state()'
  window.debug = {
    ...window.debug,
    state: () => state,
    info: () => ({
      'display objects': ex.getAllChildren(app.stage).length,
      'amount of behaviors': l1.getAll().length,
      behaviors: l1.getAll(),
    }),
    sound: () => {
      Sound.SWORD_01.play()
    },
  }

  if (process.env.NODE_ENV === 'development' && process.env.DEBUG) {
    // const spector = new SPECTOR.Spector()

    const gridGraphics = new PIXI.Graphics()
    app.stage.addChild(gridGraphics)
    ex.showGrid({
      graphics: gridGraphics,
      numberOfCells: 3,
      color: 0xff00ff,
    })
    gridGraphics.visible = false

    const scenes = Object.values(Scene).map((scene) => ({
      label: scene,
      value: scene,
    }))

    const DebugPanel = () => (
      <>
        <NumericValue
          label="FPS"
          warnAt={{
            value: 59,
            when: 'below',
          }}
          getValue={() => Math.round(MainLoop.getFPS())}
        />
        <NumericValue
          label="Behaviors"
          getValue={() => l1.getAll().length}
          warnAt={{
            value: 99,
          }}
        />
        <NumericValue
          label="Display objects"
          getValue={() => ex.getAllChildren(app.stage).length}
          warnAt={{
            value: 999,
          }}
        />
        <NumericValue
          label="State subscribers"
          getValue={() => prism.getSubscriberCount()}
          warnAt={{
            value: 99,
          }}
        />
        <NumericValue
          label="Loop duration"
          getValue={getAverageUpdateDuration}
          warnAt={{
            value: 5,
          }}
        />
        <NumericValue
          label="Draw duration"
          getValue={getAverageDrawDuration}
          warnAt={{
            value: 5,
          }}
        />
        <StringValue label="Scene" getValue={() => state.scene} />
        <Divider />
        <Button
          label="State"
          onClick={() => {
            console.log('state:', prism.target(state))
          }}
        />
        <Button
          label="Play / Pause"
          onClick={() => {
            state.application.paused = !state.application.paused
          }}
        />
        <Button
          label="Mute sounds"
          onClick={() => {
            // TODO: Set volume to 0
            console.log('sounds muted')
          }}
        />
        <Checkbox
          label="Show grid"
          onClick={(checked) => {
            if (checked) {
              gridGraphics.visible = true
            } else {
              gridGraphics.visible = false
            }
          }}
        />
        <Dropdown
          initialValue={state.scene}
          dropdownLabel="Scene"
          items={scenes}
          onChange={(value) => {
            state.scene = value as Scene
            ls.set('scene', value)
          }}
        />
      </>
    )
    // TODO: Enable this in the future
    // 'draw calls': () => drawCalls,

    const SELECTOR = '#debug-panel'
    const element = document.querySelector(SELECTOR)
    if (!element) {
      throw new Error(
        `Tried to insert debug panel into non existent element ${SELECTOR}`,
      )
    }

    renderPanel(<DebugPanel />, element as HTMLElement)

    // TODO: Enable this in the future
    // spector.captureNextFrame(app.view, true)
    // spector.onCapture.add((res) => {
    //   drawCalls = res.commands.filter(c => c.name === 'drawElements').length
    // })
  }
}

export default initializeDebugTools