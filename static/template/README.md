<!-- omit in toc -->
## My web game 

This game was initially created with [`make-web-game`](https://github.com/sajmoni/make-web-game)

---

<!-- omit in toc -->
## Documentation

- [Folder structure](#folder-structure)
  - [Components](#components)
  - [Behaviors](#behaviors)
  - [Selectors](#selectors)
- [Git branching](#git-branching)
- [Type check](#type-check)
- [Generate sprite sheet](#generate-sprite-sheet)
- [Translations](#translations)
- [Generating a production build](#generating-a-production-build)
- [Electron](#electron)
- [Sentry](#sentry)
- [Linting](#linting)
- [Debug overlay](#debug-overlay)
- [Sounds](#sounds)
- [State management](#state-management)
- [Plop](#plop)
- [Web worker](#web-worker)
- [Performance Tips](#performance-tips)
  - [Lodash](#lodash)
  - [Draw calls](#draw-calls)
  - [Immutability](#immutability)
- [Marketing](#marketing)
- [Useful external tools](#useful-external-tools)
- [Useful libraries](#useful-libraries)
- [Misc](#misc)

---

### Folder structure

#### Components

The `component` folder is a collection of Pixi UI Components.

```js
const [ playButton, renderPlayButton ] = button(configuration)  

app.stage.addChild(playButton)

renderPlayButton()
```

A component is a function that takes a `configuration` object and returns an array with two elements. The first one is a `Pixi.DisplayObject` that you need to add to a `Pixi.Container` (for example your stage). The other one is a function that you need to call every time you want to render your component based on a state change.


#### Behaviors

Behaviors can manipulate your display objects in certain ways. There are several ones included in your template. Use them as inspiration for making your own behaviors.

Included behaviors:

 - `fadeIn`
 - `fadeOut`
 - `fullScreenFadeOut`
 - `bounce`
 - `fadeOut`

#### Selectors

You should keep information about accessing your state tree in one place. 

This way, when you change your state tree, you only need to update it in one place, instead of spread out throughout your code base. 

---

### Git branching

There are two branches configured with corresponding `actions` on `Github` (TODO)

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

<!-- ---

### Validate CI config

#### Install circle.ci CLI

`https://circleci.com/docs/2.0/local-cli/`

##### MacOS

`brew install circleci`

#### Validate

Validate config at `.circleci/config.yml`

`yarn validate-ci` -->

---

### Type check

`yarn typecheck`

Will check the code with the typescript compiler.

_To ignore a line, add `@ts-ignore` on the line above_

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

### Linting

Linting is done by [`eslint`](https://github.com/eslint/eslint)

`yarn lint`

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

You can subscribe to state changes with `prism`. You register a callback for the part of state you want to subscribe to.

Example usage:

```js
const state = {
  application: {
    volume: 5,
  }
}

prism.init(state)

prims.subscribe('application.volume', (state) => {
  renderVolume(state.application.volume)
})
```

TODO: Link to `prism`

---

### Plop

With [plop](https://github.com/plopjs/plop) you can auto-generate `behaviors` and `components`. You can also configure it to generate any kind of files you want.

```
yarn plop
```

---

### Web worker

If you find that your game struggles to keep up with your desired frame rate, try putting some of the more performance heavy code in a `web worker`. A `web worker` is run in a separate thread and allows you to run code concurrently, which can dramatically improve your performance. 

The worker has no access to `PixiJS` and needs to communicate with your main thread using messages.

Here is a simple example:

`main.js`

```js
const worker = new Worker('worker.js')

worker.postMessage({
  type: Message.TO_WORKER.INIT,
  payload: 'ping',
})

worker.onmessage = ({ data: { type, payload }}) => {
  switch (type) {
    case Message.FROM_WORKER.INIT: {
      console.log('Message from worker:', payload)
    }
    default:
      break;
  }
}
```

`worker.js`

```js
onmessage = ({ data: { type, payload }}) => {
  switch (type) {
    case Message.TO_WORKER.INIT: {
      postMessage({
        type: Message.FROM_WORKER.INIT,
        payload: 'pong',
      })
    }
    default:
      break;
  }
}
```

`constant/message.js`

```js
export const TO_WORKER = {
  INIT: 'init',
}

export const FROM_WORKER = {
  INIT: 'init',
}

export default {
  TO_WORKER,
  FROM_WORKER,
}
```

---

### Performance Tips

#### Lodash

Be careful when using `lodash`. Though it is a very useful and convenient tool, it should not be included in your games "critical paths" (code that is run very often) since it often adds a significant performance penalty.

#### Draw calls

Try to keep your `draw calls` low. Inspect your scene with `SpectorJS` occasionally to verify.

TODO: Link to an external resource

#### Immutability

Try not to use immutability too much. Immutability has its benefits in many situations, but it can add a significant performance penalty if used in the wrong places. 

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

[chance](https://github.com/chancejs/chancejs) - Randomness

[xstate-fsm](https://github.com/davidkpiano/xstate/tree/master/packages/xstate-fsm) - Minimal finite state machine

---

### Misc

 - Content in the `static` folder will be copied over to `dist` without being bundled. This is used for sprite sheets.

 - For pixel perfect rendering: uncomment lines in `src/app.js`
