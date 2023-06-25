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
} from 'nano-panel'
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { snapshot } from 'valtio'
import type { AlchemyState } from '../type'
import { subscribeKey } from 'valtio/utils'
import { getAverageGlobalUpdateDuration } from './ticker'
import { getAverageSceneUpdateDuration } from '../setScene'
import { createStoredValue } from 'typed-ls'
import getAllChildren from '../module/getAllChildren'
import showGrid from './showGrid'
import { graphics } from '../module/create'
import getAllLeafChildren from '../module/getAllLeafChildren'
import initializeInspectMode, { drawHitbox } from './inspectMode'

export default function initializeDebugOverlay<
  State extends object,
  SceneKey extends string,
>({
  sceneKeys,
  state,
  app,
  ticker,
  setScene,
  scene,
}: {
  sceneKeys: SceneKey[]
  state: State & {
    alchemy: AlchemyState<SceneKey>
  }
  app: Application
  ticker: Ticker
  setScene: (sceneKey: SceneKey) => Promise<void>
  scene: SceneKey
}) {
  const storedScene = createStoredValue('scene', scene)

  const gridGraphics = new Graphics()
  gridGraphics.zIndex = 9999
  gridGraphics.name = 'gridGraphics'
  app.stage.addChild(gridGraphics)
  gridGraphics.lineStyle(2, 0xff00ff)
  showGrid(app.renderer, gridGraphics, 3)
  gridGraphics.visible = false

  const scenesToDisplay = Object.values(sceneKeys).map((scene) => ({
    label: scene,
    value: scene,
  }))

  const DebugPanel = () => {
    const [paused, setPaused] = useState(false)
    const [showGrid, setShowGrid] = useState(false)
    const [showAnchorAndPivot, setShowAnchorAndPivot] = useState(false)
    const [showHitboxes, setShowHitboxes] = useState(false)
    const [sceneState, setSceneState] = useState<SceneKey>(scene)
    const [notification, setNotification] = useState<string | undefined>(
      undefined,
    )

    useEffect(() => {
      subscribeKey(state.alchemy, 'paused', setPaused)
      subscribeKey(state.alchemy, 'error', (value) => {
        setNotification(value)
      })
      subscribeKey(state.alchemy, 'scene', (value) => {
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
            state.alchemy.error = undefined
          }}
        />
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
            state.alchemy.timer?.debug().timers.length ?? 0
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
          getValue={() => state.alchemy.scene ?? '-'}
        />
        <Divider />
        <Button
          label='Log state'
          onClick={() => {
            console.log('state:', snapshot(state))
          }}
        />
        <Button
          label='Inspect'
          onClick={() => {
            state.alchemy.paused = true
            setPaused(true)
            initializeInspectMode(app)
          }}
        />
        <Checkbox
          label='Pause game'
          checked={paused}
          onClick={(checked) => {
            state.alchemy.paused = checked
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
          onClick={() => {}}
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
              g.beginFill('#22ff22', 0.5)
                .drawCircle(pivot.x, pivot.y, 4)
                .beginFill('#dd22dd', 0.5)
                .drawCircle(pivot.x, pivot.y, 2)
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
            hitboxGraphics.name = 'hitboxGraphics'
            hitboxGraphics.zIndex = 9999
            const strokeThickness = 2
            hitboxGraphics.lineStyle(strokeThickness, '#22ff22')

            const objects = getAllLeafChildren(app.stage)

            for (const object of objects) {
              drawHitbox(object, hitboxGraphics, strokeThickness)
            }
          }}
        />
        <Dropdown
          // TODO: Fix this in nano-panel - should take undefined?
          value={sceneState}
          label='Scene'
          items={scenesToDisplay}
          onChange={(value) => {
            setScene(value)
            setSceneState(value)
            storedScene.set(value)
          }}
        />
      </Panel>
    )
  }

  const debugPanelElement = document.createElement('div')
  document.body.appendChild(debugPanelElement)
  const root = ReactDOM.createRoot(debugPanelElement)
  root.render(<DebugPanel />)
}
