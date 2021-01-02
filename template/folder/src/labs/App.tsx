import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import * as PIXI from 'pixi.js'
import * as ex from 'pixi-ex'

import * as ls from '/util/storage'
import { Lab } from './type'

const Color = {
  GRAY: '#171717',
  LIGHTER_GRAY: '#2A2A2A',
  BLUE: '#0B4D6C',
  WHITE: '#ffffff',
}

const Container = styled.div`
  display: flex;
`

const Menu = styled.div`
  background-color: ${Color.GRAY};
  color: ${Color.WHITE};
  height: 100vh;
  width: 260px;
`

const STORAGE_KEY = 'selectedLab'

const defaultPadding = css`
  padding: 10px 10px;
`

const Button = styled.div<{ selected: boolean }>`
  background-color: ${({ selected }) =>
    selected ? Color.BLUE : Color.LIGHTER_GRAY};

  cursor: pointer;
  user-select: none;
  ${defaultPadding};
`

const Title = styled.div`
  ${defaultPadding};
  font-weight: bold;
  font-size: 18px;
  user-select: none;
`

const PIXI_ID = 'pixi'

const App = ({ labData }: { labData: Record<string, (lab: Lab) => void> }) => {
  const [selectedLab, setSelectedLab] = useState<string | undefined>(undefined)
  const [app, setApp] = useState<PIXI.Application | undefined>(undefined)

  const labKeys = Object.keys(labData)
  const DEFAULT_LAB = labKeys[0]

  useEffect(() => {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
    const app = new PIXI.Application({
      width: 800,
      height: 600,
    })

    const onAssetsLoaded = () => {
      ex.init(app)
      setApp(app)
    }

    app.loader.add('spritesheet/spritesheet.json')
    app.loader.load(onAssetsLoaded)

    const element = document.querySelector(`#${PIXI_ID}`)
    if (!element) {
      throw new Error(`Couldn't find element: ${SELECTOR}`)
    }

    element.append(app.view)
  }, [])

  useEffect(() => {
    if (!selectedLab || !app) {
      return
    }

    const renderLab = labData[selectedLab]

    if (renderLab) {
      ;[...app.stage.children].forEach((child) => {
        child.destroy()
      })
      const container = new PIXI.Container()
      app.stage.addChild(container)
      renderLab({ app, container })
    } else {
      // ignore
    }
  }, [selectedLab, app, labData])

  useEffect(() => {
    const restored = ls.get(STORAGE_KEY)
    if (restored && labKeys.includes(restored)) {
      setSelectedLab(restored)
    } else {
      setSelectedLab(DEFAULT_LAB)
    }
  }, [labKeys, DEFAULT_LAB])

  useEffect(() => {
    if (!selectedLab) {
      return
    }

    ls.set(STORAGE_KEY, selectedLab)
  }, [selectedLab])

  return (
    <Container>
      <Menu>
        <Title>Labs</Title>
        {labKeys.map((labKey) => {
          return (
            <Button
              key={labKey}
              selected={selectedLab === labKey}
              onClick={() => {
                setSelectedLab(labKey)
              }}
            >
              {labKey}
            </Button>
          )
        })}
      </Menu>
      <div id={PIXI_ID} />
    </Container>
  )
}

export default App
