<h1 align="center" style="background-color: black; color:red; padding: 10px 0 15px 0">
  make-web-game
</h1>
<h4 align="center">
  CLI tool to generate a 2D browser game template
</h4>
<div align="center">
  <img src="https://badgen.net/npm/v/make-web-game?icon=npm" />
  <img src="https://badgen.net/npm/dw/make-web-game?icon=npm" />
</div>
<div align="center">
  <img src="https://badgen.net/github/last-commit/sajmoni/make-web-game?icon=github" />
</div>

---

Generates a modular template to get started making 2D games that run in the browser. All libraries can be switched out for other ones that you prefer. These are just some good defaults.

---

## Includes

 - :tv: [`pixi.js`](https://github.com/pixijs/pixi.js) - The best WebGL library for 2D graphics
 
 - :tv::up: [`pixi-ex`](https://github.com/rymdkraftverk/pixi-ex) - Pixi.js utility functions

 - :sparkles: [`parcel`](https://github.com/parcel-bundler/parcel) - Super fast no-config module bundler
 
 - :one: [`level1`](https://github.com/rymdkraftverk/level1) - Delayed and repeated callback execution for games

 - :cake: [`muncher`](https://github.com/sajmoni/muncher) - Automatically create sprite sheets from the command line 

 - :red_circle: [`circle.ci`](https://circleci.com/) config to automatically push builds to `itch.io` 

 - :policeman: [`eslint`](https://github.com/eslint/eslint) and [`typescript`](https://github.com/microsoft/TypeScript) compiler type checker

 - :chart: [`sentry`](https://sentry.io/) - Log errors

 - :sound: [`howler`](https://github.com/goldfire/howler.js/) - Preloaded sounds

 - :earth_asia: [`lingui`](https://github.com/lingui/js-lingui) - Translations

 - :straight_ruler: [`ava`](https://github.com/avajs/ava) - Super simple test framework

 <!-- - versioning (tag releases) - create release notes with ease -->

 - :bulb: [`electron`](https://github.com/electron/electron) - Easily convert your web game into a desktop application

 - Workflow for marketing

 <!-- - state management -->
 <!-- Prism? -->

 <!-- - Debug tools -->

---

## How to use

`npx make-web-game [game name]`

_Usage with `npx` ensures that you are always using the latest version_

 Once you have your own project:

 <!-- - Update the project name in: `.cicleci/config.yml` -->

 - Set sentry and google analytics URLs

 - Add your git repo with `git remote add origin`

---

## Requirements

`make-web-game` uses `yarn` and `git` and requires them to be installed on your machine in order to work.
