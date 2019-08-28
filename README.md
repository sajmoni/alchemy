# Browser game template

## Includes

 - Parcel module bundler

 - Pixi.js and l1 starter

 - Spritesheet pipeline

 - Itch.io circle.ci config

 - Eslint

 - Typescript compiler type checker


## Instructions after copying

 - Update `.cicleci/config.yml`

 - Update `src/index.html`


### Validate CI config

#### Install

`https://circleci.com/docs/2.0/local-cli/`

##### MacOS

`brew install circleci`

#### Validate

Validate config at `.circleci/config.yml`

`circleci config validate`

### Typescript

`npm run typecheck`

Will check the code with the typescript compiler.

_To ignore a line, add `@ts-ignore` on the line above_

### Static folder

Content in the `static` folder will be copied over to `dist` without being bundled.
