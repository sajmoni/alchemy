import {
  sprite,
  htmlText,
  sync,
  graphics,
  container as createContainer,
  createObjectPool,
} from 'alchemy-engine'
import { type Scene } from '~/type'

export default async function game(scene: Scene) {
  const {
    textures,
    container,
    input: { isKeyDown, debouncedKey },
    state,
    timer: { repeatEvery },
    sound,
    app,
    timer,
    useScreenShake,
    useLightMask,
  } = scene

  const screenShake = useScreenShake(container)
  // TODO: Enable again
  // const lightMask = useLightMask()
  const background = graphics(container)
  background.label = 'background'
  background.fill(0xcccccc).rect(0, 0, app.screen.width, app.screen.height)
  // TODO: Figure out this one
  // background.cacheAsBitmap = true

  const c = createContainer(container)
  c.label = 'container'
  c.position.set(200, 200)

  const g = graphics(c)
  g.fill({ color: 0xbb22dd, alpha: 1 }).rect(0, 0, 100, 100)
  g.label = 'big pink'
  g.scale.set(2)
  c.pivot.set(c.width / 2, c.height / 2)

  const _text = htmlText(container, {
    fontSize: 24,
    fill: 0xffffff,
  })
  _text.label = 'number 24'

  const spritePool = createObjectPool(10, () => {
    return sprite(container)
  })
  const s = spritePool.get()
  s.texture = textures['./square-1']
  s.label = 'small blue'
  s.position.set(200, 200)

  // const l1 = lightMask.create({
  //   texture: textures['light/circle-1'],
  //   getPosition: () => s.position,
  // })
  // l1.label = 'light mask 1'

  sync(_text, 'text', state, 'gold')

  const s2 = sprite(container, textures['./square-1'])
  s2.anchor.set(1)
  s2.label = 'other name'
  s2.position.set(350, 250)
  // const l2 = lightMask.create({
  //   texture: textures['light/circle-1'],
  //   getPosition: () => s2.position,
  // })
  // l2.label = 'light mask 2'
  timer.repeatEvery(10, () => {
    s2.x += 1
  })

  // container.mask = lightMask.getLightMask()

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
  sound.coin.play()
}
