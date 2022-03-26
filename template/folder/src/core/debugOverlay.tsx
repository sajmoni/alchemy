import * as l1 from 'l1'
import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'
import MainLoop from 'mainloop.js'
import {
  NumericValue,
  Button,
  Divider,
  Checkbox,
  Dropdown,
  StringValue,
  Panel,
  Snackbar,
} from 'nano-panel'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { snapshot } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import app from '~/app'
import state from '~/state'
import { Scene } from '~/enum'
import { getAverageUpdateDuration, getAverageDrawDuration } from './loop'
import env from '~/env'
import { scene as storedScene } from '~/ls'

const initializeDebugOverlay = (): void => {
  if (env.DEBUG) {
    const gridGraphics = new PIXI.Graphics()
    gridGraphics.zIndex = 1
    app.stage.addChild(gridGraphics)
    gridGraphics.lineStyle(2, 0xff00ff)
    ex.showGrid(gridGraphics, 3)
    gridGraphics.visible = false

    const scenes = Object.values(Scene).map((scene) => ({
      label: scene,
      value: scene,
    }))

    const DebugPanel = () => {
      const [paused, setPaused] = useState(state.application.paused)
      const [showGrid, setShowGrid] = useState(false)
      const [scene, setScene] = useState(state.scene)
      const [notification, setNotification] = useState<string | undefined>(
        undefined,
      )

      useEffect(() => {
        subscribeKey(state.application, 'paused', setPaused)
        subscribeKey(state.application, 'error', setNotification)
        subscribeKey(state, 'scene', setScene)
      }, [])

      useEffect(() => {
        gridGraphics.visible = showGrid
      }, [showGrid])

      return (
        <Panel>
          <Snackbar
            isOpen={!!notification}
            value={notification ?? ''}
            onClose={() => {
              state.application.error = undefined
            }}
          />
          <NumericValue
            label="FPS"
            warnAt={{
              value: 59,
              when: 'below',
            }}
            getValue={(): number => Math.round(MainLoop.getFPS())}
          />
          <NumericValue
            label="Behaviors"
            getValue={(): number => l1.getAll().length}
            warnAt={{
              value: 99,
            }}
          />
          <NumericValue
            label="Display objects"
            getValue={(): number => ex.getAllChildren(app.stage).length}
            warnAt={{
              value: 999,
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
            label="Log state"
            onClick={() => {
              console.log('state:', snapshot(state))
            }}
          />
          <Checkbox
            label="Pause game"
            checked={paused}
            onClick={(checked) => {
              state.application.paused = checked
            }}
          />
          <Checkbox
            label="Show grid"
            checked={showGrid}
            onClick={(checked) => {
              setShowGrid(checked)
            }}
          />
          <Dropdown
            value={scene}
            label="Scene"
            items={scenes}
            onChange={(value) => {
              state.scene = value
              storedScene.set(state.scene)
            }}
          />
        </Panel>
      )
    }

    const selector = '#debug-panel'
    const element = document.querySelector(selector)
    if (!element) {
      throw new Error(
        `Tried to insert debug panel into non existent element ${selector}`,
      )
    }

    ReactDOM.render(<DebugPanel />, element as HTMLElement)
  }
}

export default initializeDebugOverlay
