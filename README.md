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

## Other highlights

- 100% Type-Safe
- Minimal API
- Easy to use
- Batteries included (get started using one CLI command)
- Includes `vite` for a super fast and modern dev server

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

```

### useLightMask

Get a light mask

```ts

```

### useScreenShake

Enable the use of screen shake

```ts

```

### animate

- sine
- easeOut
- easeIn

### util

- center

### app

Pixi Application instance

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

- timer

### container

A scene specific Pixi container. Will be destroyed when scene is changed.

### state

Set state to trigger `sync` and `subscribe` functions

### subscribeKey

### timer

**delay**

```ts
// Wait 100 ticks
await delay(100)
```

**repeatUntil**

```ts
await repeatUntil(3, () => {})
```

**repeatEvery**

```ts
const cancel = repeatEvery(3, () => {})
```

### input

**debouncedKey**

```ts
input.debouncedKey(
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

```ts

```
