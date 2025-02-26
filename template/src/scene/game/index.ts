import {
  sprite,
  graphics,
  container as createContainer,
  createObjectPool,
  centerPivot,
} from 'alchemy-engine'

import { type Scene } from '~/type'
import pause from './pause'

export default async function game(scene: Scene) {
  const {
    container,
    input,
    sound,
    music,
    timer,
    useScreenShake,
    app,
    getTexture,
  } = scene

  centerPivot(container, app.screen.width, app.screen.height)

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

  const s1 = spritePool.get()
  s1.texture = getTexture('./square-1')
  s1.position.set(200, 200)

  const s2 = sprite(container, getTexture('./square-1'))
  s2.anchor.set(1)
  s2.position.set(350, 250)
  timer.repeatEvery(10, () => {
    s2.x += 1
  })

  input.debouncedKey(
    'Space',
    () => {
      screenShake(1)
    },
    1,
  )

  timer.repeatEvery(1, (_time, delta) => {
    if (input.isKeyDown(['a', 'ArrowLeft'])) {
      s1.position.x -= 1 * delta
    }
    if (input.isKeyDown(['w', 'ArrowUp'])) {
      s1.position.y -= 1 * delta
    }
    if (input.isKeyDown(['s', 'ArrowDown'])) {
      s1.position.y += 1 * delta
    }
    if (input.isKeyDown(['d', 'ArrowRight'])) {
      s1.position.x += 1 * delta
    }
  })

  sound.coin.play()
  music.bgm.loop(true).play()

  pause(scene)
}
