<h1 align="center" >
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

Generates a template to make a 2D browser game using `PixiJS` and `TypeScript`.

## :sparkles: Features

- Full TypeScript support
- Game loop using MainLoop.js
- Simple scene management
- Keyboard input
- Separate web app to develop features in isolation
- Web worker
- Auto-pause when window loses focus
- Reactive state management - trigger functions when state changes
- Visual effects like fade-in and blink
- Debug panel to inspect your scene
- Sprite management using `aseprite`
- Sound management
- Main menu
- Type-safe local storage
- Very fast dev server using `vite`
- Github actions workflow to deploy to `itch.io`
- Code formatting with `prettier`

---

### Dependencies included

#### Rendering and game logic

- :tv: [`PixiJS`](https://github.com/pixijs/pixi.js)

- :up: [`pixi-ex`](https://github.com/sajmoni/pixi-ex)\*

- :pill: [`valtio`](https://github.com/pmndrs/valtio)

- :loop: [`mainloop`](https://github.com/IceCreamYou/MainLoop.js)

- :tropical_drink: [`juice.js`](https://github.com/rymdkraftverk/juice.js)\*

- :one: [`level1`](https://github.com/rymdkraftverk/level1)\*

- :sound: [`howler`](https://github.com/goldfire/howler.js/)

#### Tooling

- :m: [`typescript`](https://github.com/microsoft/TypeScript)

- :zap: [`vite`](https://github.com/vitejs/vite)

- :nail_care: [`prettier`](https://github.com/prettier/prettier)

- :chart: [`sentry`](https://sentry.io/)

- :straight_ruler: [`vitest`](https://github.com/vitest-dev/vitest)

- :eyes: [`nano-panel`](https://github.com/sajmoni/nano-panel)\*

- :red_circle: [`GitHub actions workflows`](https://github.com/features/actions)

- :recycle: [`plop`](https://github.com/plopjs/plop)

\* = made by me

---

## How to use

```shell
npx make-web-game@latest <game-name>
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

## What you should do after the script is run

- Update the itch.io project name in `.github/workflows/release.yml` on line `69`.

- [Add your itch.io API key to your Github project secrets](https://itch.io/docs/butler/login.html)

- Set Sentry DSN in `src/index.ts` at line `25`.

---

## Template docs

[Docs](template/folder/README.md)

---

## Showcase

A list of games bootstrapped using this tool:

- [Diablito](https://rymdkraftverk.itch.io/diablito) _A very tiny roguelike_

---

## Requirements

- `git >=v2.28.0`
