import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import * as PIXI from 'pixi.js'
import { settings } from 'pixi.js'
import * as ex from 'pixi-ex'

import * as storage from '../src/util/storage'
/* PLOP_INJECT_IMPORT */
import componentLab from './lab/component'

const Color = {
  GRAY: '#171717',
  LIGHTER_GRAY: '#2A2A2A',
  BLUE: '#0B4D6C',
  WHITE: '#ffffff',
}

const Container = styled.div`
  display: flex;
`

const Lab = styled.div``

const Menu = styled.div`
  background-color: ${Color.GRAY};
  color: ${Color.WHITE};
  height: 100vh;
  width: 260px;
`

const STORAGE_KEY = 'selectedLab'

const lab = {
  /* PLOP_INJECT_LAB */
  components: componentLab,
}
const labKeys = Object.keys(lab)
const DEFAULT_LAB = labKeys[0]

const defaultPadding = css`
  padding: 10px 10px;
`

const Button = styled.div`
  background-color: ${({ $selected }) =>
    $selected ? Color.BLUE : Color.LIGHTER_GRAY};

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

const App = () => {
  const [selectedLab, setSelectedLab] = useState(undefined)
  const [app, setApp] = useState(null)

  useEffect(() => {
    settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST
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

    document.querySelector('#pixi').append(app.view)
  }, [])

  useEffect(() => {
    if (!selectedLab || !app) {
      return
    }

    const renderLab = lab[selectedLab]

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
  }, [selectedLab, app])

  useEffect(() => {
    const restored = storage.restore(STORAGE_KEY)
    if (restored && labKeys.includes(restored)) {
      setSelectedLab(restored)
    } else {
      setSelectedLab(DEFAULT_LAB)
    }
  }, [])

  useEffect(() => {
    if (!selectedLab) {
      return
    }

    storage.save(STORAGE_KEY, selectedLab)
  }, [selectedLab])

  return (
    <Container>
      <Menu>
        <Title>Labs</Title>
        {labKeys.map((labKey) => {
          return (
            <Button
              key={labKey}
              $selected={selectedLab === labKey}
              onClick={() => {
                setSelectedLab(labKey)
              }}
            >
              {labKey}
            </Button>
          )
        })}
      </Menu>
      <Lab id="pixi"></Lab>
    </Container>
  )
}

export default App
