<h1 align="center" style="background-color: black; color:red; padding: 10px 0 15px 0">
  make-web-game
</h1>
<h4 align="center">
  CLI tool to generate a 2D browser game template
</h4>
<div align="center">
  <img src="https://badgen.net/npm/v/make-web-game?icon=npm" />
  <!-- <img src="https://badgen.net/npm/dw/make-web-game?icon=npm" /> -->
  <img src="https://badgen.net/github/last-commit/sajmoni/make-web-game?icon=github" />
</div>

---

Generates a modular template to get started making 2D games that run in the browser. All libraries can be switched out for other ones that you prefer. These are just some good defaults.

---

## :sparkles: Includes

### Rendering

- :tv: [`PixiJS`](https://github.com/pixijs/pixi.js) - The best WebGL library for 2D graphics

- :boom: [`pixi-particles`](https://github.com/pixijs/pixi-particles) - A particle system for PixiJS

- :coffee: [`pixi-filter`](https://github.com/pixijs/pixi-filters) - A collection of display filters for PixiJS

- :up: [`pixi-ex`](https://github.com/sajmoni/pixi-ex) - Useful utility functions

### QA

- :m: [`typescript`](https://github.com/microsoft/TypeScript)

- :policeman: [`xo`](https://github.com/xojs/xo) - Linter

- :nail_care: [`prettier`](https://github.com/prettier/prettier) - Code formatting

- :chart: [`sentry`](https://sentry.io/) - Log errors (TODO)

- :no_entry_sign: :poop: [`lint-staged`](https://github.com/okonet/lint-staged) + :dog: [`husky`](https://github.com/typicode/husky) - Ensure code quality on each git commit and push

- :straight_ruler: [`ava`](https://github.com/avajs/ava) - Super simple test framework

- :+1: [`yup`](https://github.com/jquense/yup) - Object schema validation

### Tooling

- :zap: [`parcel`](https://github.com/parcel-bundler/parcel) - Very fast no-config module bundler

- :cake: [`muncher`](https://github.com/sajmoni/muncher) - Automatically create sprite sheets from the command line

- :red_circle: [`GitHub actions`](https://github.com/features/actions) workflows to automatically push builds to `itch.io` (TODO)

- :bulb: [`electron`](https://github.com/electron/electron) - Convert your web game into a desktop application

- :recycle: [`plop`](https://github.com/plopjs/plop) - Micro-generator framework

- :detective: [`SpectorJS`](https://github.com/BabylonJS/Spector.js) - Explore and troubleshoot your WebGL scenes (TODO)

### Other

- :sound: [`howler`](https://github.com/goldfire/howler.js/) - Preloaded sounds

- :tropical_drink: [`juice.js`](https://github.com/rymdkraftverk/juice.js) - Adds "juice" to your animations

- :one: [`level1`](https://github.com/rymdkraftverk/level1) - Trigger a function after a set amount of game updates

- :loop: [`mainloop`](https://github.com/IceCreamYou/MainLoop.js) - Game loop

- :earth_asia: [`lingui`](https://github.com/lingui/js-lingui) - Translations

- Workflow for marketing (TODO)

 <!-- - state management -->
 <!-- Prism? -->

 <!-- - Debug tools -->

---

## How to use

```shell
npx make-web-game <game-name> [options]
```

_Usage with `npx` ensures that you are always using the latest version_

`make-web-game` will do the following:

- Create a new folder called `<game-name>`
- Copy all template files to that folder
- Install the dependencies
- Create an initial commit

### Example usage

```
npx make-web-game my-game
```

The output file structure will look like this:

```
my-game/
├── .github/ (TODO)
├── asset/
│   ├── font/
│   ├── sound/
│   └── sprite/
├── labs/
│   ├── lab/
|   │   └── component.ts
│   ├── App.js
│   ├── index.html
│   ├── index.js
│   └── style.css
├── locale/
├── plop/
│   ├── lab/
|   │   └── component.ts
│   ├── App.js
│   ├── index.html
│   ├── index.js
│   └── style.css
├── script/
│   ├── setupTests.js
│   └── validateData.js
├── node_modules/
├── src/
│   ├── component/
│   │   ├── bar.ts
│   │   ├── button.ts
│   │   ├── index.ts
│   │   ├── pauseMenu.ts
│   │   ├── select.ts
│   │   └── slider.ts
│   ├── constant/
│   │   ├── index.js
│   │   ├── language.js
│   │   ├── render.js
│   │   ├── resolution.js
│   │   └── textStyle.js
│   ├── data/
│   │   └── sample.js
│   ├── effect/
│   │   ├── blink.ts
│   │   ├── clickBlink.ts
│   │   ├── easeOutToPosition.ts
│   │   ├── fadeIn.ts
│   │   ├── fadeOut.ts
│   │   ├── fullscreenFadeInOut.ts
│   │   └── index.ts
│   ├── input/
│   │   ├── gamePad.ts
│   │   ├── keyboard.ts
│   │   └── mouse.ts
│   ├── main/
│   │   ├── scene/
|   │   │   ├── game.ts
|   │   │   ├── index.ts
|   │   │   └── mainMenu.js
│   │   ├── ui/
|   │   │   └── settings.js
│   │   └── index.js
│   ├── particle/
│   │   ├── explosion.js
│   │   └── index.js
│   ├── selector/
│   │   └── index.js
│   ├── sound/
│   │   ├── createSound.js
│   │   ├── globalVolume.js
│   │   └── index.js
│   ├── type/
│   │   └── scene.ts
│   ├── util/
│   │   ├── autoPause.js
│   │   ├── debugOverlay.js
│   │   ├── getDefaultLanguage.js
│   │   ├── loading.js
│   │   ├── prism.ts
│   │   └── storage.js
│   ├── app.js
│   ├── example.test.js
│   ├── i18n.js
│   ├── index.html
│   ├── index.js
│   ├── pixi.ts
│   ├── state.ts
│   ├── style.css
│   └── package.json
├── static/
│   └── spritesheet/
├── .gitignore
├── .babelrc
├── .npmrc
├── electron.js
├── lint-staged.config.js
├── package.json
├── plopfile.js
├── README.md
├── tsconfig.json
└── yarn.lock
```

## Options

`--no-translations` (TODO)

Exclude translations from the game

`--no-electron` (TODO)

Exclude electron from the game

`--verbose` (TODO)

Display full output. Good for debugging.

 <!-- ## What to do after the script is run -->

 <!-- - Update the project name in: `.cicleci/config.yml` -->

 <!-- - Set sentry URL -->

 <!-- - Make the `release` branch protected so that you don't accidentally push to it. -->

---

## Showcase

A list of games made using this tool:

- [Diablito](https://rymdkraftverk.itch.io/diablito) - A very tiny roguelike

---

## Requirements

`make-web-game` uses `yarn` and `git` and requires them to be installed on your machine in order to work.
