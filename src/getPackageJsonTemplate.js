
module.exports = ({ appName }) => {
  const packageJsonTemplate = {
    name: appName,
    version: '0.0.0',
    private: true,
    main: './electron.js',
    scripts: {
      start: 'parcel src/index.html --no-autoinstall --no-cache',
      build: 'rm -rf dist && parcel build src/index.html --public-url ./',
      test: 'ava',
      lint: 'eslint .',
      typecheck: 'tsc --module commonjs --allowJs --checkJs --noEmit --target es2016 src/*.js',
      'validate-ci': 'circleci config validate',
      'check-all': 'yarn lint && yarn typecheck && yarn validate-ci',
      munch: 'muncher --input sprite --output static/spritesheet/spritesheet --flip',
      'add-locale': 'lingui add-locale',
      extract: 'lingui extract --clean --overwrite',
      compile: 'lingui compile',
      'elec:start': 'electron .',
      'elec:build': 'rm -rf dist && parcel build src/index.html --public-url ./ --target electron',
      'elec:pack': 'yarn electron-packager . --overwrite',
      'elec:run': `open ${appName}-darwin-x64/${appName}.app`,
      'elec:all': 'yarn elec:build && yarn elec:pack && yarn elec:run',
    },
    ava: {
      require: [
        '@babel/register',
      ],
    },
  }
  return packageJsonTemplate
}
