import {
  sprite,
  graphics,
  createObjectPool,
  centerPivot,
  text,
} from 'alchemy-engine'

import { type Scene } from '~/type'
import { TextStyle } from '~/data'
import pause from './pause'

export default async function game(scene: Scene) {
  centerPivot(scene.container, scene.app.screen.width, scene.app.screen.height)

  const screenShake = scene.useScreenShake(scene.container)

  const g = graphics(scene.container)
  g.rect(0, 0, 100, 100).fill({ color: 0xbb22dd, alpha: 1 })
  g.scale.set(2)

  const alchemyText = text(scene.container, TextStyle.MAIN, 'Alchemy engine')
  alchemyText.anchor.x = 0.5
  alchemyText.position.x = scene.app.screen.width / 2
  alchemyText.position.y = 10

  const spritePool = createObjectPool(10, () => sprite(scene.container))

  const sprite1 = spritePool.get()
  sprite1.texture = scene.getTexture('./square-1')
  sprite1.position.set(200, 200)

  const s2 = sprite(scene.container, scene.getTexture('./square-1'))
  s2.anchor.set(1)
  s2.position.set(350, 250)
  scene.timer.repeatEvery(10, () => {
    s2.x += 1
  })

  scene.input.debouncedKey(
    'Space',
    () => {
      screenShake(1)
    },
    1,
  )

  scene.timer.repeatEvery(1, (_time, delta) => {
    if (scene.input.isKeyDown(['a', 'ArrowLeft'])) {
      sprite1.position.x -= 1 * delta
    }
    if (scene.input.isKeyDown(['w', 'ArrowUp'])) {
      sprite1.position.y -= 1 * delta
    }
    if (scene.input.isKeyDown(['s', 'ArrowDown'])) {
      sprite1.position.y += 1 * delta
    }
    if (scene.input.isKeyDown(['d', 'ArrowRight'])) {
      sprite1.position.x += 1 * delta
    }
  })

  scene.sound.coin.play()
  scene.music.bgm.loop(true).play()

  pause(scene)
}
