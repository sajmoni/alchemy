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

Generates a template to make a 2D browser game using `PixiJS` and `TypeScript`.

---

## :sparkles: Includes

### Rendering and game logic

- :tv: [`PixiJS`](https://github.com/pixijs/pixi.js)

- :boom: [`pixi-particles`](https://github.com/pixijs/pixi-particles)

- :up: [`pixi-ex`](https://github.com/sajmoni/pixi-ex)

- :pill: [`valtio`](https://github.com/pmndrs/valtio)

- :loop: [`mainloop`](https://github.com/IceCreamYou/MainLoop.js)

- :tropical_drink: [`juice.js`](https://github.com/rymdkraftverk/juice.js)

- :one: [`level1`](https://github.com/rymdkraftverk/level1)

- :sound: [`howler`](https://github.com/goldfire/howler.js/)

### Tooling

- :m: [`typescript`](https://github.com/microsoft/TypeScript)

- :policeman: [`xo`](https://github.com/xojs/xo)

- :nail_care: [`prettier`](https://github.com/prettier/prettier)

- :chart: [`sentry`](https://sentry.io/)

- :no_entry_sign: :poop: [`lint-staged`](https://github.com/okonet/lint-staged) + :dog: [`husky`](https://github.com/typicode/husky)

- :straight_ruler: [`ava`](https://github.com/avajs/ava)

- :eyes: [`nano-panel`](https://github.com/sajmoni/nano-panel)

- :zap: [`esbuild`](https://github.com/evanw/esbuild)

- :red_circle: [`GitHub actions workflows`](https://github.com/features/actions)

- :recycle: [`plop`](https://github.com/plopjs/plop)

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
├── .github/
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
│   └── setupTests.js
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

## What you should do after the script is run

- Update the itch.io project name in `.github/workflows/release.yml` on line `69`.

- [Add your itch.io API key to your Github project secrets](https://itch.io/docs/butler/login.html)

- Set Sentry DSN in `src/index.ts` at line `25`.

- Suggestion: Make the `release` branch protected so that you don't accidentally push to it.

---

## Template docs

[Docs](template/folder/README.md)

---

## Showcase

A list of games bootstrapped using this tool:

- [Diablito](https://rymdkraftverk.itch.io/diablito) _A very tiny roguelike_

---

## Requirements

- `yarn`: `v1.x`
- `git`: `>=v2.28.0`
