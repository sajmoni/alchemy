# Browser game template

## Includes

 - `parcel` - Super fast no-config module bundler :sparkles:

 - `pixi.js` - The best WebGL library for 2D graphics :tv:

 - `level1` - Pixi and general game utils :wrench:

 - `muncher` - Automatically create sprite sheets from the command line :cake:

 - `circle.ci` config to automatically push builds to `itch.io` :red_circle:

 - `eslint` and `typescript` compiler type checker :policeman:

 - `sentry` and `google analytics` - Log errors and usage :chart:

 - `howler` - Preload sounds :sound:


## How to use

 - Click the green `Use this template` button on the top of the page.

 Once you have your own project:

 - Update the project name in: `.cicleci/config.yml`

 - Update sentry and google analytics URLs

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

### Static folder

Content in the `static` folder will be copied over to `dist` without being bundled.

### Generate spritesheet

`yarn munch`
