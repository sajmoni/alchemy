import { Application, Graphics, Ticker } from 'pixi.js'
import {
  NumericValue,
  Button,
  Divider,
  Checkbox,
  Dropdown,
  Panel,
  StringValue,
  Snackbar,
  Row,
} from 'nano-panel'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { snapshot } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import { createStoredValue } from 'typed-ls'

import type { InternalState } from '../type.js'
import { getAverageGlobalUpdateDuration } from './ticker.js'
import { getAverageSceneUpdateDuration } from '../setScene.js'
import getAllChildren from '../module/getAllChildren.js'
import showGrid from './showGrid.js'
import { graphics } from '../module/create.js'
import getAllLeafChildren from '../module/getAllLeafChildren.js'
import initializeInspectMode, { drawHitbox } from './inspectMode.js'

export type Panel<State> = Array<
  | {
      type: 'string'
      label: string
      getValue: (state: State) => string
    }
  | {
      type: 'number'
      label: string
      getValue: (state: State) => number
    }
>

export default function initializeDebugOverlay<
  UserState extends object,
  SceneKey extends string,
  State extends UserState,
>({
  sceneKeys,
  state,
  internalState,
  app,
  ticker,
  setScene,
  scene,
  panel,
}: {
  sceneKeys: SceneKey[]
  state: State
  internalState: InternalState<SceneKey>
  app: Application
  ticker: Ticker
  setScene: (sceneKey: SceneKey) => Promise<void>
  scene: SceneKey
  panel?: Panel<State> | undefined
}) {
  const storedScene = createStoredValue('scene', scene)

  const gridGraphics = new Graphics()
  gridGraphics.zIndex = 9999
  gridGraphics.label = 'gridGraphics'
  app.stage.addChild(gridGraphics)
  showGrid(app.screen, gridGraphics, 3)
  gridGraphics.stroke({ width: 2, color: 0xdddd33 })
  gridGraphics.visible = false

  const scenesToDisplay = Object.values(sceneKeys).map((scene) => ({
    label: scene,
    value: scene,
  }))

  const DebugPanel = () => {
    const [paused, setPaused] = useState(false)
    const [showGrid, setShowGrid] = useState(false)
    const [showAnchorAndPivot, setShowAnchorAndPivot] = useState(false)
    const [showHoverInfo, setShowHoverInfo] = useState(false)
    const [showHitboxes, setShowHitboxes] = useState(false)
    const [sceneState, setSceneState] = useState<SceneKey>(scene)
    const [notification, setNotification] = useState<string | undefined>(
      undefined,
    )

    useEffect(() => {
      subscribeKey(internalState, 'paused', setPaused)
      subscribeKey(internalState, 'error', (value) => {
        setNotification(value)
      })
      subscribeKey(internalState, 'scene', (value) => {
        setSceneState(value)
      })
      const _scene = storedScene.get()
      if (_scene) {
        setScene(_scene)
        setSceneState(_scene)
      }
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
            internalState.error = undefined
          }}
        />
        <Divider />
        <NumericValue
          label='FPS'
          warnAt={{
            value: 59,
            when: 'below',
          }}
          getValue={(): number => Math.round(ticker.FPS)}
        />
        <NumericValue
          label='Timers'
          getValue={(): number =>
            internalState.timer?.debug().timers.length ?? 0
          }
          warnAt={{
            value: 50,
          }}
        />
        <NumericValue
          label='Display objects'
          getValue={(): number => getAllChildren(app.stage).length}
          warnAt={{
            value: 999,
          }}
        />
        <NumericValue
          label='Global update'
          getValue={getAverageGlobalUpdateDuration}
          warnAt={{
            value: 5,
          }}
        />
        <NumericValue
          label='Scene update'
          getValue={getAverageSceneUpdateDuration}
          warnAt={{
            value: 5,
          }}
        />
        <StringValue
          label='Scene'
          getValue={() => internalState.scene ?? '-'}
        />
        <Divider />
        <Row>
          <Button
            label='Log state'
            onClick={() => {
              console.log('state:', snapshot(state))
            }}
          />
          <Button
            label='Inspect'
            onClick={() => {
              internalState.paused = true
              setPaused(true)
              initializeInspectMode(app)
            }}
          />
        </Row>
        <Divider />
        <Checkbox
          label='Pause game'
          checked={paused}
          onClick={(checked) => {
            internalState.paused = checked
            setPaused(checked)
          }}
        />
        <Checkbox
          label='Show grid'
          checked={showGrid}
          onClick={(checked) => {
            app.stage.sortableChildren = true
            setShowGrid(checked)
          }}
        />
        <Checkbox
          label='Show hover info'
          checked={showAnchorAndPivot}
          onClick={() => {
            setShowHoverInfo(!showHoverInfo)
          }}
        />
        <Checkbox
          label='Show anchor / pivot'
          checked={showAnchorAndPivot}
          onClick={(checked) => {
            app.stage.sortableChildren = true
            setShowAnchorAndPivot(checked)

            const objects = getAllChildren(app.stage)
            for (const object of objects) {
              const g = new Graphics()
              const { pivot } = object
              g.zIndex = 9999
              g.fill({ color: 0x22ff22, alpha: 0.5 })
                .circle(pivot.x, pivot.y, 4)
                .fill({ color: 0xdd22dd, alpha: 0.5 })
                .circle(pivot.x, pivot.y, 2)
              // TODO: This will only work with containers now
              object.addChild(g)
              // Ensure that anchor graphics always has scale 1
              g.scale.set(1 / object.scale.x, 1 / object.scale.y)
              g.position.set()
            }
          }}
        />
        <Checkbox
          label='Show hitboxes'
          checked={showHitboxes}
          onClick={(checked) => {
            app.stage.sortableChildren = true
            setShowHitboxes(checked)

            const hitboxGraphics = graphics(app.stage)
            hitboxGraphics.label = 'hitboxGraphics'
            hitboxGraphics.zIndex = 9999
            const strokeThickness = 2
            hitboxGraphics.stroke({ width: strokeThickness, color: 0x22ff22 })

            const objects = getAllLeafChildren(app.stage)

            for (const object of objects) {
              drawHitbox(object, hitboxGraphics, strokeThickness)
            }
          }}
        />
        <Dropdown
          value={sceneState}
          label='Scene'
          items={scenesToDisplay}
          onChange={(value) => {
            setScene(value)
            setSceneState(value)
            storedScene.set(value)
          }}
        />
        <Divider />
        {panel ?
          panel.map((p, index) => {
            if (p.type === 'string') {
              return (
                <StringValue
                  key={index}
                  label={p.label}
                  getValue={() => p.getValue(state)}
                />
              )
            }
            if (p.type === 'number') {
              return (
                <NumericValue
                  key={index}
                  label={p.label}
                  getValue={() => p.getValue(state)}
                />
              )
            }

            return null
          })
        : null}
      </Panel>
    )
  }

  const debugPanelElement = document.createElement('div')
  document.body.appendChild(debugPanelElement)
  const root = ReactDOM.createRoot(debugPanelElement)
  root.render(<DebugPanel />)
}
