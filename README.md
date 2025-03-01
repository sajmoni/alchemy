# :alembic: alchemy engine <!-- omit from toc -->

> 👾 Easily make 2D browser games with pixi.js

## :sparkles: Features <!-- omit from toc -->

- 100% Type-Safe
- Batteries included (get started using one CLI command)
- Reactive - Re-render view when state changes
- Object pooling
- Timer - Run logic every X ticks
- Animations
- Debug overlay
- Keyboard input
- Sounds
- Sprite sheet generation
- Scenes
- CLI - Create project and components
- CI - Workflows to build, test and deploy to `itch.io`
- Screen shake
- Uses [`vite`](https://github.com/vitejs/vite) for a super fast and modern dev server

---

## Getting started <!-- omit from toc -->

Run the `init` command from within a Git repo

```console
npx alchemy@latest init
```

This will:

- Copy template files
- Add `alchemy-engine` and `pixi.js` as dependencies

---

## API Docs <!-- omit from toc -->

- [Module API](#module-api)
  - [create](#create)
    - [sprite](#sprite)
    - [animatedSprite](#animatedsprite)
    - [text](#text)
    - [htmlText](#htmltext)
    - [bitmapText](#bitmaptext)
    - [container](#container)
    - [graphics](#graphics)
    - [rectangle](#rectangle)
  - [event](#event)
    - [onClick](#onclick)
    - [onHover](#onhover)
  - [sync](#sync)
    - [sync](#sync-1)
    - [syncPosition](#syncposition)
  - [keys](#keys)
    - [arrowKeys](#arrowkeys)
  - [position](#position)
  - [getAllChildren](#getallchildren)
  - [getAllLeafChildren](#getallleafchildren)
  - [debug](#debug)
    - [logObject](#logobject)
  - [boundsToString](#boundstostring)
  - [contains](#contains)
  - [intersects](#intersects)
  - [type guards](#type-guards)
    - [isAnimatedSprite](#isanimatedsprite)
  - [loadDataFromImage](#loaddatafromimage)
  - [pool](#pool)
- [Scene API](#scene-api)
  - [getTexture](#gettexture)
  - [getTextures](#gettextures)
  - [useScreenShake](#usescreenshake)
  - [animate](#animate)
  - [app](#app)
  - [music](#music)
  - [sound](#sound)
  - [setScene](#setscene)
  - [global](#global)
  - [container](#container-1)
  - [state](#state)
  - [internalState](#internalstate)
  - [subscribe, subscribeKey, proxy](#subscribe-subscribekey-proxy)
  - [timer](#timer)
  - [input](#input)
  - [random](#random)
- [CLI](#cli)
  - [dev](#dev)
  - [sprite](#sprite-1)
  - [sound](#sound-1)
- [Local development](#local-development)
- [See also](#see-also)

## Module API

These are imported directly from `alchemy-engine`

### create

Convenience functions to create Pixi objects

#### sprite

```ts
import { sprite } from 'alchemy-engine'

sprite(container, getTexture('./square-1')])
```

#### animatedSprite

```ts
import { animatedSprite } from 'alchemy-engine'

animatedSprite(container, getTextures(['./square-1', './square-2']))
```

#### text

```ts
import { text } from 'alchemy-engine'

text(container, textStyle, 'Hello world')
```

#### htmlText

```ts
import { htmlText } from 'alchemy-engine'

htmlText(container, textStyle, 'Hello world')
```

#### bitmapText

```ts
import { bitmapText } from 'alchemy-engine'

bitmapText(container, textStyle, 'Hello world')
```

#### container

```ts
import { container } from 'alchemy-engine'

container(_container)
```

#### graphics

```ts
import { graphics } from 'alchemy-engine'

graphics(container)
```

#### rectangle

```ts
import { rectangle } from 'alchemy-engine'

rectangle(container, { x: 0, y: 0, width: 10, height: 10 })
```

### event

#### onClick

Convenience functions for mouse input

```ts
import { onClick } from 'alchemy-engine'

onClick(container, () => {
  console.log('Clicked!')
})
```

#### onHover

```ts
import { onHover } from 'alchemy-engine'

onHover(container, {
  onOver() {
    console.log('Hovered!')
  },
  onOut() {
    console.log('Not hovered!')
  },
})
```

### sync

#### sync

#### syncPosition

### keys

#### arrowKeys

Constants for all arrow keys

```ts
import { arrowKeys } from 'alchemy-engine'

export const keys = ['a', 'w', 's', 'd', ...arrowKeys] as const
```

### position

TODO

### getAllChildren

TODO

### getAllLeafChildren

TODO

### debug

#### logObject

Nicely log a Pixi object. Set `label` property for best result.

```ts
import { logObject } from 'alchemy-engine'

const sprite = new Sprite()
sprite.label = 'sprite'
logObject(sprite)
```

### boundsToString

Enables easier logging of sprite bounds

```ts
import { boundsToString } from 'alchemy-engine'

console.log(boundsToString(sprite))
```

### contains

Check if a point is within the bounds of an object

```ts
import { contains } from 'alchemy-engine'

if (contains(sprite, { x: 1, y: 1 })) {
  // point is within bounds of sprite
}
```

### intersects

Check if the bounds of two objects are intersecting

```ts
import { intersects } from 'alchemy-engine'

if (intersects(sprite1, sprite2)) {
  // sprites are intersecting
}
```

### type guards

#### isAnimatedSprite

```ts
import { isAnimatedSprite } from 'alchemy-engine'

if (isAnimatedSprite(sprite)) {
  // sprite is of type AnimatedSprite
}
```

### loadDataFromImage

This function can be used to for example load a level from image data

```ts
import { loadDataFromImage } from 'alchemy-engine'
import map from '~/public/asset/map.png?url'

const { pixels, width, height } = await loadDataFromImage(map)
console.log(pixels)
// ['255-255-255', '0-0-0']
```

### pool

[Docs](https://github.com/sajmoni/nano-pool)

---

## Scene API

The arguments passed to a scene

```ts
{
  textures,
  container,
  input,
  state,
  timer,
  sound,
  app,
  timer,
  useScreenShake,
}: Scene
```

### getTexture

Get a texture

```ts
function myScene(scene: Scene) {
  sprite(scene.container, scene.getTexture('./texture-1'))
}
```

### getTextures

Get multiple textures

```ts
function myScene(scene: Scene) {
  animatedSprite(
    scene.container,
    scene.getTextures(['./texture-1', './texture-2']),
  )
}
```

### useScreenShake

Enable the use of screen shake

`screenShake` takes a number between 0 and 1

```ts
const screenShake = useScreenShake(container)

screenShake(0.5)
```

### animate

These functions all require an `onUpdate` and `duration` argument

Optionally you can pass a `startValue` (default: 0) and `endValue` (default: 1)

<!-- TODO -->

- sine
- easeOut
- easeIn
- linear

```ts

```

### app

The Pixi `Application` instance

### music

```ts
Record<MusicName, Howl>
```

Example:

```ts
scene.music.bgm.loop(true).play()
```

### sound

```ts
Record<SoundName, Howl>
```

Example:

```ts
scene.sound.coin.play()
```

### setScene

Takes `sceneKey` as an argument

```ts
setScene('mainMenu')
```

### global

**timer**

A timer that doesn't get cancelled when changing scenes

### container

A scene specific Pixi container. Will be destroyed when scene is changed.

### state

Set state to trigger `sync` and `subscribe` functions

### internalState

<!-- TODO -->

### subscribe, subscribeKey, proxy

Re-exported from [valtio](https://github.com/pmndrs/valtio)

Changes from `valtio` versions:

- Triggers once up front when called
- Unsubscribes when changing scene

### timer

**delay**

Resolves a promise after X ticks

```ts
// Wait 100 updates
await scene.timer.delay(100)
```

**repeatUntil**

Execute a callback every update until `duration` is reached

```ts
await scene.timer.repeatUntil(3, (time, deltaTime) => {})
```

**repeatEvery**

Execute a callback indefinitely every `interval` updates

Returns a `cancel` function

```ts
const cancel = repeatEvery(3, (time, deltaTime) => {})
```

### input

**debouncedKey**

<!-- TODO: Rethink this API -->

```ts
scene.input.debouncedKey(
  'd',
  () => {
    s.position.x += 1
  },
  // Delay between key presses
  10,
)
```

**isKeyDown**

Check if a key is currently being pressed

```ts
scene.timer.repeatEvery(1, () => {
  if (scene.input.isKeyDown(['a', 'ArrowLeft'])) {
    s.position.x -= 1
  }
  if (scene.input.isKeyDown(['d', 'ArrowRight'])) {
    s.position.x += 1
  }
})
```

### random

There is a built-in seedable random module.

To set the seed, pass it in to `createGame`

```ts
createGame({
  randomSeed: 99,
})
```

The module uses the same API as [park-miller](https://github.com/sindresorhus/park-miller), with some additions:

`chance(percentage) => boolean`

---

## CLI

### dev

Start the dev server. Listens to changes to source code, `sprite`, `src/public/asset/sound` and `src/public/asset/music` folders.

```console
npx alchemy dev
```

### sprite

Generate sprite sheet

```console
npx alchemy sprite
```

### sound

Load sounds

```console
npx alchemy sound
```

---

## Local development

Run `./go.sh` to test that things work

---

## See also

- State machine: [xstate](https://github.com/statelyai/xstate/tree/main/packages/xstate-fsm)
- Noise [simplex-noise](https://github.com/jwagner/simplex-noise.js)
