<!-- TODO: Insert project name here -->

## My web game <!-- omit in toc -->

## Index <!-- omit in toc -->

- [Folder structure](#folder-structure)
  - [fragment](#fragment)
- [view](#view)
  - [effect](#effect)
  - [data](#data)
  - [scene](#scene)
  - [worker](#worker)
- [Git branching](#git-branching)
- [QA](#qa)
- [Generate sprite sheet](#generate-sprite-sheet)
- [Generating a production build](#generating-a-production-build)
- [Sentry](#sentry)
- [Debug overlay](#debug-overlay)
- [Sounds](#sounds)
- [State management](#state-management)
- [Plop](#plop)
- [Web worker](#web-worker)
- [Input](#input)
  - [Keyboard](#keyboard)
- [Labs](#labs)
- [Performance Tips](#performance-tips)
  - [Lodash](#lodash)
  - [Draw calls](#draw-calls)
  - [Immutability](#immutability)
- [Object pool](#object-pool)
- [Marketing](#marketing)
- [Useful external tools](#useful-external-tools)
- [Useful libraries](#useful-libraries)
  - [Graphics](#graphics)
  - [Text](#text)
  - [Randomness](#randomness)
  - [Physics](#physics)
  - [State machine](#state-machine)
  - [Utils](#utils)
  - [Events](#events)
  - [Debug](#debug)
  - [Steam integration](#steam-integration)
- [Useful external resources](#useful-external-resources)
- [Guides](#guides)
  - [Pixel perfect rendering](#pixel-perfect-rendering)

---

### Folder structure

#### fragment

The `fragment` folder contains `reusable` ui components.

A `fragment` is a function that returns two things:

1. A `PIXI.Container` that you need to add as a child to another `PIXI.Container`.

2. A `render` function. Call this whenever you want to re-render your component. (For example due to a state update)

_Example_

```js
const [playButton, renderPlayButton] = button()

app.stage.addChild(playButton)

renderPlayButton()
```

_Create a new one with `npm run plop`_

### view

A `view` is like a `fragment` that contains it's own re-render logic. Therefore
they should only be created once.

They return a `PIXI.Container`.

_Example_

```js
const _settingsMenu = settingsMenu()

app.stage.addChild(_settingsMenu)
```

#### effect

Effects change how your `PIXI.Component`s look.

_Create a new one with `npm run plop`_

_example_

```js
await fadeOut(component, { resolveAt: 0.6, duration: 15 })
```

#### data

Data that your game uses. For example `equipment`, `items`, `enemies` etc.

#### scene

A `scene` is a function that renders stuff. You can switch scenes by setting
the `scene` property in `state`.

_Create a new one with `npm run plop`_

#### worker

Code that will run in a worker thread.

---

### Git branching

There are two branches configured with corresponding Github actions workflows

A push to `main` triggers the following pipeline:

- Run all tests, linting and typecheck
<!-- - Build and publish to stage-project on `itch.io`.
- Increase version number and push it as a tag to `main` -->

A push to `release`, triggers the following pipeline

- Run all tests, linting and typecheck
- Build and publish to production-project on `itch.io`.
- Increases version number and pushes it as a tag to `main`
<!-- - Generate draft patch notes -->

If a hotfix in production is needed, then it should be made on the `release` branch and immediately cherry picked to `main`.

This should generally be avoided and only be done if its really truly needed and can't wait for next release.

---

### QA

`npm run qa`

Will type check the code `typescript` and lint check with `xo`.

---

### Generate sprite sheet

Put your `aseprite` files into the `asset/sprite` folder and run `npm run ase`.

---

### Generating a production build

`npm run build`

---

<!-- TODO -->
<!-- ### Electron

Electron allows you to create an executable file for PC and Mac. This can then be sold on Steam or other digital stores.

`elec:start` - Test the game with Electron

`elec:build` - Build the game specifically for Electron

`elec:pack` - Create the binary

`elec:run` - Execute the binary

`elec:all` - Run `build`, `pack` and `run` -->

---

### Sentry

Sentry captures exceptions and errors in your game and uploads them to `sentry.io`.

---

### Debug overlay

Set `DEBUG` to `true` in `src/env.ts` to display an overlay with debug information.

This overlay can be customized to show any information you want.

[Docs](https://github.com/sajmoni/nano-panel)

---

### Sounds

Sounds are preloaded with `Howler`.

Example usage:

```js
import sound from '~/sound'

sound.coin.play()
```

Add sound files to `src/public/asset/sound` and run `npm run sound` to be able to use them.

---

### State management

You can subscribe to state changes with [`valtio`](https://github.com/pmndrs/valtio).
You register a callback for the part of state you want to subscribe to.

Example usage:

```js
import { subscribeKey } from 'valtio'
import state from '~/state'

subscribeKey(state.application, 'volume', (volume) => {
  renderVolume(volume)
})
```

---

### Plop

With [`plop`](https://github.com/plopjs/plop) you can create new files from the command line.

```
npm run plop
```

---

### Web worker

If you find that your game struggles to keep up with your desired frame rate, try putting some of your code in the `web worker`.

A `web worker` is run in a separate thread and allows you to run code concurrently, which can dramatically improve your performance. The worker has no access to `PixiJS` and needs to communicate with your main thread using messages.

---

### Input

#### Keyboard

Keyboard input uses [`tinykeys`](https://github.com/jamiebuilds/tinykeys)

---

### Labs

`Labs` is a separate webapp that allows you to experiment and prototype separately from your game.

Run `npm run labs` to start the app.

With `npm run plop` you can create new labs.

Labs run on `localhost:3001`

---

### Performance Tips

#### Lodash

Be careful when using `lodash`. Though it is a very useful and convenient tool, it should not be included in your games "critical paths" (code that is run very often) since it often adds a significant performance penalty.

#### Draw calls

Try to keep your `draw calls` low. You can inspect your game with [`SpectorJS`](https://github.com/BabylonJS/Spector.js) occasionally to verify.

#### Immutability

Try not to use immutability too much. Immutability has its benefits in many situations, but it can add a significant performance penalty if used in the wrong places.

### Object pool

Creating and destroying pixi objects can be bad for performance. It is especially bad since it will trigger Garbage Collection that might make your game lag occasionally. Try to reuse your pixi display objects instead of creating new ones.

---

### Marketing

- Use [Gifski](https://sindresorhus.com/gifski) to generate GIFs on Mac.

---

### Useful external tools

[Pixi TextStyle generator](https://pixijs.io/pixi-text-style)

[Pixi Filter explorer](http://pixijs.io/pixi-filters/tools/demo/)

[Pixi Particles explorer](https://pixijs.io/pixi-particles-editor/)

---

### Useful libraries

#### Graphics

- [pixi-filters](https://github.com/pixijs/pixi-filters)

Example usage:

```js
import * as filters from 'pixi-filters'

const text = new PIXI.Text()

text.filters = [new filters.CRTFilter()]
```

- [pixi-heaven](https://github.com/gameofbombs/pixi-heaven) - Advanced Sprite rendering options

#### Text

[pixi-multistyle-text](https://github.com/tleunen/pixi-multistyle-text) - Apply different text styles to different parts of a string

#### Randomness

- [chance](https://github.com/chancejs/chancejs)

- [random-js](https://github.com/ckknight/random-js)

#### Physics

- [matter](https://github.com/liabru/matter-js)

#### State machine

- [xstate-fsm](https://github.com/davidkpiano/xstate/tree/master/packages/xstate-fsm) - Minimal finite state machine

#### Utils

[nanoid](https://github.com/ai/nanoid) - Unique string ID generator

#### Events

[eventemitter3](https://github.com/primus/eventemitter3)

#### Debug

[`SpectorJS`](https://github.com/BabylonJS/Spector.js) - Explore and troubleshoot your WebGL scenes

[`debug`](https://github.com/visionmedia/debug) - A better console.log

#### Steam integration

[`greenworks`](https://github.com/greenheartgames/greenworks)

---

### Useful external resources

[Game dev market](https://www.gamedevmarket.net/) - Buy assets for your game

---

### Guides

#### Pixel perfect rendering

Uncomment lines in `src/app.js`.
