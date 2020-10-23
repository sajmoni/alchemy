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

Generates a modular template to get started making 2D games that run in the browser. All libraries can be switched out for other ones that you prefer. These are just some good defaults.

---

## :sparkles: Includes

### Rendering

- :tv: [`PixiJS`](https://github.com/pixijs/pixi.js) - The best WebGL library for 2D graphics

- :boom: [`pixi-particles`](https://github.com/pixijs/pixi-particles) - A particle system for PixiJS

- :coffee: [`pixi-filter`](https://github.com/pixijs/pixi-filters) - A collection of display filters for PixiJS

- :up: [`pixi-ex`](https://github.com/sajmoni/pixi-ex) - Useful utility functions

### Game logic

- :loop: [`mainloop`](https://github.com/IceCreamYou/MainLoop.js) - Game loop

- :tropical_drink: [`juice.js`](https://github.com/rymdkraftverk/juice.js) - Adds "juice" to your animations

- :one: [`level1`](https://github.com/rymdkraftverk/level1) - Trigger a function after a set amount of game updates

- :star: [`state-prism`](https://github.com/sajmoni/state-prism) - State management

### QA

- :m: [`typescript`](https://github.com/microsoft/TypeScript)

- :policeman: [`xo`](https://github.com/xojs/xo) - Linter

- :nail_care: [`prettier`](https://github.com/prettier/prettier) - Code formatting

- :chart: [`sentry`](https://sentry.io/) - Log errors (TODO)

- :no_entry_sign: :poop: [`lint-staged`](https://github.com/okonet/lint-staged) + :dog: [`husky`](https://github.com/typicode/husky) - Ensure code quality on each git commit and push

- :straight_ruler: [`ava`](https://github.com/avajs/ava) - Super simple test framework

- :eyes: [`nano-panel`](https://github.com/sajmoni/nano-panel) - Display data when debugging

### Tooling

- :zap: [`parcel`](https://github.com/parcel-bundler/parcel) - Very fast no-config module bundler

- :cake: [`muncher`](https://github.com/sajmoni/muncher) - Automatically create sprite sheets from the command line

- :red_circle: [`GitHub actions`](https://github.com/features/actions) workflows to automatically push builds to `itch.io`

- :bulb: [`electron`](https://github.com/electron/electron) - Convert your web game into a desktop application

- :recycle: [`plop`](https://github.com/plopjs/plop) - Micro-generator framework

- :detective: [`SpectorJS`](https://github.com/BabylonJS/Spector.js) - Explore and troubleshoot your WebGL scenes (TODO)

- :microscope: `"Labs"` - Separate webapp for experiments and prototyping

### Other

- :sound: [`howler`](https://github.com/goldfire/howler.js/) - Preloaded sounds

* Marketing checklist (TODO)

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
│   ├── App.js
│   ├── index.html
│   ├── index.js
│   └── style.css
├── plop/
│   ├── component/
│   ├── constant/
│   ├── data/
│   ├── effect/
│   ├── lab/
│   ├── scene/
│   └── plopfile.ts
├── script/
│   ├── setupTests.js
│   └── validateData.js
├── node_modules/
├── src/
│   ├── component/
│   ├── constant/
│   ├── data/
│   ├── effect/
│   ├── input/
│   ├── main/
│   │   ├── scene/
│   │   ├── ui/
│   │   └── index.js
│   ├── particle/
│   ├── sound/
│   ├── type/
│   ├── util/
│   ├── worker/
│   ├── app.ts
│   ├── debug.ts
│   ├── example.test.js
│   ├── index.html
│   ├── index.js
│   ├── loop.ts
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
├── README.md
├── tsconfig.json
└── yarn.lock
```

<!-- ## Options

`--no-electron` (TODO)

Exclude electron from the game

`--verbose` (TODO)

Display full output. Good for debugging. -->

## What you should do after the script is run

- Update the itch.io project name in `.github/workflows/release.yml` on line `69`.

- [Add your itch.io API key to your Github project secrets](https://itch.io/docs/butler/login.html)

<!-- - Set Sentry URL. -->

<!-- - Suggestion: Make the `release` branch protected so that you don't accidentally push to it. -->

---

## Template docs

[Docs](template/folder/README.md)

---

## Showcase

A list of games bootstrapped using this tool:

- [Diablito](https://rymdkraftverk.itch.io/diablito) - A very tiny roguelike

---

## Requirements

`make-web-game` uses `yarn` and `git` and requires them to be installed on your machine in order to work.
