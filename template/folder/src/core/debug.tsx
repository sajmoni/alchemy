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
import * as prism from 'state-prism'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import app from '/app'
import Sound from '/sound'
import state, { State } from '/state'
import { Scene } from '/enum'
import * as ls from '/util/storage'
import { getAverageUpdateDuration, getAverageDrawDuration } from './loop'
import env from '/env'

declare global {
  interface Window {
    debug: any
  }
}

type ConsoleInfo = Record<string, any>

const initializeDebugTools = (): void => {
  // * These commands can be run in the console, e.g: 'debug.state()'
  window.debug = {
    ...window.debug,
    state: (): State => state,
    info: (): ConsoleInfo => ({
      'display objects': ex.getAllChildren(app.stage).length,
      'amount of behaviors': l1.getAll().length,
      behaviors: l1.getAll(),
    }),
    sound: (): void => {
      Sound.COIN.play()
    },
  }

  if (env.DEBUG) {
    const gridGraphics = new PIXI.Graphics()
    gridGraphics.zIndex = 1
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

    const DebugPanel = (): JSX.Element => {
      const [paused, setPaused] = useState(state.application.paused)
      const [muteSounds] = useState(false)
      const [showGrid, setShowGrid] = useState(false)
      const [scene, setScene] = useState(state.scene)
      const [notification, setNotification] = useState(undefined)

      useEffect(() => {
        prism.subscribe('application.paused', setPaused)
        prism.subscribe('application.error', setNotification)
        prism.subscribe('scene', setScene)
      }, [])

      useEffect(() => {
        gridGraphics.visible = showGrid
      }, [showGrid])

      return (
        <Panel>
          <Snackbar
            value={notification}
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
            label="State subscribers"
            getValue={(): number => prism.getSubscriberCount()}
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
          <StringValue label="Scene" getValue={(): string => state.scene} />
          <Divider />
          <Button
            label="Log state"
            onClick={(): void => {
              console.log('state:', prism.target(state))
            }}
          />
          <Button
            label="Log subscribers"
            onClick={(): void => {
              console.log('subscribers:', prism.getSubscribers())
            }}
          />
          <Checkbox
            label="Pause game"
            checked={paused}
            onClick={(checked): void => {
              state.application.paused = checked
            }}
          />
          <Checkbox
            label="Mute sounds"
            checked={muteSounds}
            onClick={(_checked): void => {
              // TODO
            }}
          />
          <Checkbox
            label="Show grid"
            checked={showGrid}
            onClick={(checked): void => {
              setShowGrid(checked)
            }}
          />
          <Dropdown
            value={scene}
            dropdownLabel="Scene"
            items={scenes}
            onChange={(value): void => {
              state.scene = value as Scene
              ls.set('scene', value)
            }}
          />
        </Panel>
      )
    }

    const SELECTOR = '#debug-panel'
    const element = document.querySelector(SELECTOR)
    if (!element) {
      throw new Error(
        `Tried to insert debug panel into non existent element ${SELECTOR}`,
      )
    }

    ReactDOM.render(<DebugPanel />, element as HTMLElement)
  }
}

export default initializeDebugTools
