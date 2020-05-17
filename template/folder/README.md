<!-- omit in toc -->

## My web game

This game was initially created with [`make-web-game`](https://github.com/sajmoni/make-web-game)

---

<!-- omit in toc -->

## Documentation

- [My web game](#my-web-game)
- [Documentation](#documentation)
  - [Folder structure](#folder-structure)
    - [Components](#components)
      - [Configuration](#configuration)
    - [Effects](#effects)
    - [Selectors](#selectors)
    - [Data](#data)
    - [Main](#main)
    - [Worker](#worker)
  - [Git branching](#git-branching)
  - [QA](#qa)
  - [Generate sprite sheet](#generate-sprite-sheet)
  - [Translations](#translations)
  - [Generating a production build](#generating-a-production-build)
  - [Electron](#electron)
  - [Sentry](#sentry)
  - [Debug overlay](#debug-overlay)
  - [Sounds](#sounds)
  - [State management](#state-management)
  - [Plop](#plop)
  - [Web worker](#web-worker)
  - [Input](#input)
    - [Keyboard](#keyboard)
    - [Mouse](#mouse)
    - [GamePad](#gamepad)
  - [Labs](#labs)
  - [Performance Tips](#performance-tips)
    - [Lodash](#lodash)
    - [Draw calls](#draw-calls)
    - [Immutability](#immutability)
  - [Object pool](#object-pool)
  - [Marketing](#marketing)
  - [Useful external tools](#useful-external-tools)
  - [Useful libraries](#useful-libraries)
    - [Randomness](#randomness)
    - [Physics](#physics)
    - [State machine](#state-machine)
    - [Utils](#utils)
    - [Events](#events)
  - [Useful external resources](#useful-external-resources)
  - [Misc](#misc)

---

### Folder structure

#### Components

The `component` folder contains a collection of Pixi UI Components.

```js
const [playButton, renderPlayButton] = button()

app.stage.addChild(playButton)

renderPlayButton()
```

A component is a function that returns an array with two elements.

- The first one is a `Pixi.DisplayObject` that you need to add to a `Pixi.Container` (for example your stage).

- The second one is a `render` function. You need to call this every time you want to re-render your component. (For example due to a state update)

##### Configuration

A component can take an optional `configuration` object.

```js
const configuration = {
  visible: true,
}

const [playButton] = button(configuration)
```

#### Effects

Effects can change how your display objects look like.

The template includes the following effects:

- `fadeIn`
- `fadeOut`
- `fullScreenFadeOut`
- `bounce`
- `fadeOut`

#### Selectors

You should keep information about accessing your state tree in one place.

This way, when you change your state tree, you only need to update it in one place, instead of spread out throughout your code base.

#### Data

JSON data that your game uses. Data in this folder can be validated by running `yarn validate`.

#### Main

Code that will run in the main thread.

#### Worker

Code that will run in a worker thread.

---

### Git branching

There are two branches configured with corresponding Github actions workflows (TODO)

A push to `master` triggers the following pipeline:

- Run all tests, linting and typecheck
- Build and publish to stage-project on `itch.io`.
- Increase version number and push it as a tag to `master`

A push to `release`, triggers the following pipeline

- Run all tests, linting and typecheck
- Build and publish to production-project on `itch.io`.
- Increases version number and pushes it as a tag to `master`
- Generate draft patch notes (?)

If a hotfix in production is needed, then it should be made on the `release` branch and immediately cherry picked to `master`.

This should generally be avoided and only be done if its really truly needed and can't wait for next release.

---

### QA

`yarn qa`

Will check the code with the `typescript` compiler and lint check with `xo`.

---

### Generate sprite sheet

Put your image files into the `asset/sprite` folder and run `yarn munch` to run `muncher`.

[`muncher`](https://github.com/sajmoni/muncher) automatically generates your sprite sheets for you, provided that have `Texture packer` installed.

---

### Translations

Translations use [`lingui`](https://github.com/lingui/js-lingui).

Example usage:

```js
import { t } from '@lingui/macro'
import i18n from './i18n'

new PIXI.Text(i18n._(t('main.gameStarted')`Game started!`)
```

`yarn extract` to generate translation files in the `locale` folder.

`yarn compile` to compile translations and make them show up in the game.

`yarn add-locale sv` to generate a new language.

---

### Generating a production build

`yarn build`

---

### Electron

Electron allows you to create an executable file for PC and Mac. This can then be sold on Steam or other digital stores.

`elec:start` - Test the game with Electron

`elec:build` - Build the game specifically for Electron

`elec:pack` - Create the binary

`elec:run` - Execute the binary

`elec:all` - Run `build`, `pack` and `run`

---

### Sentry

Sentry captures exceptions and errors in your game and uploads them to `sentry.io`.

TODO: how to use / configure

---

### Debug overlay

Set `DEBUG` to `true` in `src/index.js` to display an overlay with debug information.
This overlay can be customized to show any information you want.

TODO: Link to nano-overlay

---

### Sounds

Sounds are preloaded with `Howler`.

Example usage:

```js
import Sound from './sound'

Sound.SWORD_01.play()
```

Add sounds to `src/sound/index.js`

---

### State management

You can subscribe to state changes with [`state-prism`](https://github.com/sajmoni/state-prism). You register a callback for the part of state you want to subscribe to.

Example usage:

```js
import * as prism from 'state-prism'

let state = {
  application: {
    volume: 5,
  },
}

state = prism.init(state)

prims.subscribe('application.volume', (volume) => {
  renderVolume(volume)
})
```

---

### Plop

With [`plop`](https://github.com/plopjs/plop) you can create new files from the command line.

```
yarn plop
```

---

### Web worker

If you find that your game struggles to keep up with your desired frame rate, try putting some of your code in the `web worker`.

A `web worker` is run in a separate thread and allows you to run code concurrently, which can dramatically improve your performance. The worker has no access to `PixiJS` and needs to communicate with your main thread using messages.

---

### Input

#### Keyboard

Keyboard input uses `mousetrap`

TODO

#### Mouse

TODO

#### GamePad

TODO

---

### Labs

`Labs` is a separate webapp that allows you to experiment and prototype separately from your game.

Run `yarn labs` to start the app.

With `yarn plop` you can create new labs.

---

### Performance Tips

#### Lodash

Be careful when using `lodash`. Though it is a very useful and convenient tool, it should not be included in your games "critical paths" (code that is run very often) since it often adds a significant performance penalty.

#### Draw calls

Try to keep your `draw calls` low. Inspect your scene with `SpectorJS` occasionally to verify.

TODO: Link to an external resource

#### Immutability

Try not to use immutability too much. Immutability has its benefits in many situations, but it can add a significant performance penalty if used in the wrong places.

### Object pool

Creating and destroying pixi objects can be bad for performance. It is especially bad since it will trigger Garbage Collection that might make your game lag occasionally.

TODO: How to use the object pool

---

### Marketing

- Install [Gifski](https://sindresorhus.com/gifski) to generate GIFs on Mac.

Screenshots (TODO)

Game play videos / trailers (TODO)

Pitch (One sentence, Paragraph and long) (TODO)

Hooks (TODO)

---

### Useful external tools

[Pixi TextStyle generator](https://pixijs.io/pixi-text-style)

[Pixi Filter explorer](http://pixijs.io/pixi-filters/tools/demo/)

[Pixi Particles explorer](https://pixijs.io/pixi-particles-editor/)

---

### Useful libraries

#### Randomness

- [chance](https://github.com/chancejs/chancejs)

- [random-js](https://github.com/ckknight/random-js)

#### Physics

- [matter]()

#### State machine

- [xstate-fsm](https://github.com/davidkpiano/xstate/tree/master/packages/xstate-fsm) - Minimal finite state machine

#### Utils

#### Events

[tiny-toolkit](https://github.com/sajmoni/tiny-toolkit) - Useful utility functions

[eventemitter3](https://github.com/primus/eventemitter3) - Events

---

### Useful external resources

[Game dev market](https://www.gamedevmarket.net/) - Buy assets for your game

---

### Misc

- Content in the `static` folder will be copied over to `dist` without being bundled. This is used for sprite sheets.

- For pixel perfect rendering: uncomment lines in `src/app.js`
