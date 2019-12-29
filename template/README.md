## My web game

This game was initially created with `make-web-game`

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

### Static folder

Content in the `static` folder will be copied over to `dist` without being bundled. This is where you should put your sprite sheets.

### Generate sprite sheet

`yarn munch`
