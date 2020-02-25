## My web game

This game was initially created with [`make-web-game`](https://github.com/sajmoni/make-web-game)

---

## Documentation

### Validate CI config

#### Install circle.ci CLI

`https://circleci.com/docs/2.0/local-cli/`

##### MacOS

`brew install circleci`

#### Validate

Validate config at `.circleci/config.yml`

`yarn validate-ci`

### Typescript

`yarn typecheck`

Will check the code with the typescript compiler.

_To ignore a line, add `@ts-ignore` on the line above_

### Generate sprite sheet

[`muncher`](https://github.com/sajmoni/muncher) automatically generates your sprite sheets on the Command line

`yarn munch`

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

### Generating a production build

`yarn build`

### Electron

Electron allows you to create an executable file for PC and Mac. This can then be sold on Steam or other digital stores.

TODO: how to use

### Sentry

Sentry captures exceptions and errors in your game and uploads them to `sentry.io`.

TODO: how to use / configure

### Linting

Linting is done by [`eslint`](https://github.com/eslint/eslint)

`yarn lint`

### Debug overlay

Set `DEBUG` to `true` in `src/index.js` to display an overlay with debug information. 
This overlay can be easily customized to show any information you want.

TODO: Link to nano-overlay

### Sounds

Sounds are preloaded with `Howler`.

Example usage: 

```js
import Sound from './sound'

Sound.SWORD_01.play()
```

### State management

You can subscribe to state changes with `prism`. You register a callback for the part of state you want to subscribe to.

Example usage:

```js
  // TODO
```

TODO: Link to `prism`

### Marketing

Install Gifski to genereate GIFs on Mac.

TODO: Link to Gifksi

Screenshots
Gameplay videos / trailers
GIFs
Sales pitch (One sentence, Paragraph and long)

### Pixi TextStyle generator

https://pixijs.io/pixi-text-style

### Misc

 - Content in the `static` folder will be copied over to `dist` without being bundled. This is used for sprite sheets.

 - For pixel perfect rendering: uncomment line `5` in `src/app.js`
