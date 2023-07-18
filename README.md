# :alembic: alchemy engine

> :space_invader: Easily make 2D browser games with TypeScript and pixi.js :space_invader:

_(This project was previously known as `make-web-game`)_

## :sparkles: Features

- Reactive - Re-render view when state changes
- Pooling - Create all game object up front - in render never add or remove game objects
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
- 100% Type-Safe
- Batteries included (get started using one CLI command)
- Uses [`vite`](https://github.com/vitejs/vite) for a super fast and modern dev server

---

## :no_good: Out of scope

- State machine (Recommended library: [xstate](https://github.com/statelyai/xstate/tree/main/packages/xstate-fsm))
- Physics
- Network

---

## Upcoming features

- Tests - E2E and unit tests
- i18n - Translations

---

## Getting started

```console
npx alchemy-engine@latest create <game-name>
```

---

## Module API

WIP

### create

- sprite
- animatedSprite
- text
- htmlText
- container
- graphics
- rectangle

### event

- onClick
- onHover

### sync

- sync
- syncPosition

### arrowKeys

Constants for all arrow keys

```ts
import { arrowKeys } from 'alchemy-engine'

export const keys = ['a', 'w', 's', 'd', ...arrowKeys] as const
```

### position

TODO

### boundsToString

TODO

### getAllChildren

TODO

### getAllLeafChildren

TODO

### logObject

Nicely log a Pixi object. Set `name` property for best result.

```ts
const sprite = new Sprite()
sprite.name = 'sprite'
logObject(sprite)
```

### contains

Check if a point is within the bounds of an object

### intersects

Check if the bounds of two objects are intersecting

### pool

[Docs](https://github.com/sajmoni/nano-pool)

---

## Scene API

WIP

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
  useLightMask,
}: Scene
```

### textures

An object containing all textures by name

```ts
Record<TextureName, Texture>
```

### getTextures

Get multiple textures

```ts
const textures = getTextures(['./texture-1', './texture-2'])
new AnimatedSprite(textures)
```

### useLightMask

Get a light mask

```ts

```

### useScreenShake

Enable the use of screen shake

```ts
const screenShake = useScreenShake(container)
screenShake.add(0.5)
```

### animate

- sine
- easeOut
- easeIn

These functions all require an `onUpdate` and `duration` argument

Optionally you can pass a `startValue` (default: 0) and `endValue` (default: 1)

### util

- center

### app

The Pixi `Application` instance

### music

```ts
Record<MusicName, Howl>
```

### sound

```ts
Record<SoundName, Howl>
```

### setScene

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

### subscribe, subscribeKey, proxy

Re-exported from [valtio](https://github.com/pmndrs/valtio)

### timer

**delay**

```ts
// Wait 100 updates
await delay(100)
```

**repeatUntil**

Execute a callback every update until `duration` is reached

```ts
await repeatUntil(3, (time, deltaTime) => {})
```

**repeatEvery**

Execute a callback forever every `interval` updates

Returns a `cancel` function

```ts
const cancel = repeatEvery(3, (time, deltaTime) => {})
```

### input

**debouncedKey**

```ts
debouncedKey(
  // Key id
  'd',
  // Callback
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
repeatEvery(1, () => {
  if (isKeyDown(['a', 'ArrowLeft'])) {
    s.position.x -= 1
  }
  if (isKeyDown(['d', 'ArrowRight'])) {
    s.position.x += 1
  }
})
```

---

## CLI

### create

```console
npx alchemy-engine@latest create <game-name>
```

### dev

Start the dev server. Listens to changes to source code, `sprite`, `src/public/asset/sound` and `src/public/asset/music` folders.

```console
npx alchemy-engine@latest dev
```

### sprite

Generate sprite sheet

```console
npx alchemy-engine@latest sprite
```

### sound

Load sounds

```console
npx alchemy-engine@latest sound
```
