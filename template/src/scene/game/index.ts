import {
  sprite,
  htmlText,
  sync,
  graphics,
  container as createContainer,
  createObjectPool,
} from 'alchemy-engine'

import { type Scene } from '~/type'
import pause from './pause'

export default async function game(scene: Scene) {
  const {
    textures,
    container,
    input: { isKeyDown, debouncedKey },
    state,
    timer: { repeatEvery },
    sound,
    music,
    timer,
    useScreenShake,
    app,
  } = scene

  // Set center point in the middle to allow for screen shake
  container.pivot.set(app.screen.width / 2, app.screen.height / 2)
  container.position.set(app.screen.width / 2, app.screen.height / 2)

  const screenShake = useScreenShake(container)
  const background = graphics(container)
  background.rect(10, 10, 100, 100).fill({ color: '#cccccc', alpha: 1 })
  background.position.set(100, 100)

  const c = createContainer(container)
  c.position.set(200, 200)

  const g = graphics(c)
  g.rect(0, 0, 100, 100).fill({ color: 0xbb22dd, alpha: 1 })
  g.scale.set(2)
  c.pivot.set(c.width / 2, c.height / 2)

  const spritePool = createObjectPool(10, () => sprite(container))
  const s = spritePool.get()
  s.texture = textures['./square-1']
  s.position.set(200, 200)

  const s2 = sprite(container, textures['./square-1'])
  s2.anchor.set(1)
  s2.position.set(350, 250)
  timer.repeatEvery(10, () => {
    s2.x += 1
  })

  debouncedKey(
    'Space',
    () => {
      screenShake.add(1)
    },
    10,
  )

  repeatEvery(1, (_time, delta) => {
    if (isKeyDown(['a', 'ArrowLeft'])) {
      s.position.x -= 1 * delta
    }
    if (isKeyDown(['w', 'ArrowUp'])) {
      s.position.y -= 1 * delta
    }
    if (isKeyDown(['s', 'ArrowDown'])) {
      s.position.y += 1 * delta
    }
    if (isKeyDown(['d', 'ArrowRight'])) {
      s.position.x += 1 * delta
    }
  })

  state.gold = 42
  repeatEvery(60, () => {
    state.gold++
  })

  sound.coin.play()
  music.bgm.loop()
  music.bgm.play()

  pause(scene)
}
