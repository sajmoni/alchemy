const getPackageJsonTemplate = ({ projectName }) => {
  const packageJsonTemplate = {
    name: projectName,
    version: '0.0.0',
    private: true,
    main: './electron.js',
    scripts: {
      start: 'yarn game && yarn labs',
      game: 'node script/serve.js public src/index.ts 8000',
      labs: 'node script/serve.js public src/labs/index.ts 8001',
      build: 'node script/build.js',
      sound: 'node script/loadSounds.js',
      test: 'ava',
      plop: 'plop --plopfile plop/plopfile.ts',
      qa: 'tsc && xo --fix',
      ase: './aseprite.sh',
      'elec:start': 'electron .',
      'elec:build':
        'rm -rf dist && parcel build src/index.html --public-url ./ --target electron',
      'elec:pack': 'yarn electron-packager . --overwrite',
      'elec:run': `open ${projectName}-darwin-x64/${projectName}.app`,
      'elec:all': 'yarn elec:build && yarn elec:pack && yarn elec:run',
    },
    ava: {
      require: ['ts-node/register'],
      extensions: ['ts'],
    },
    prettier: {
      trailingComma: 'all',
      semi: false,
      singleQuote: true,
      useTabs: false,
      bracketSpacing: true,
    },
    xo: {
      ignores: [
        'public/worker/index.js',
        'build/index.js',
        'build/worker/index.js',
      ],
      extends: 'xo-react',
      prettier: true,
      parser: '@typescript-eslint/parser',
      plugins: ['fp'],
      env: ['browser', 'es2020', 'node'],
      rules: {
        'fp/no-arguments': 'error',
        'fp/no-class': 'error',
        'fp/no-delete': 'error',
        'fp/no-events': 'error',
        'fp/no-get-set': 'error',
        'fp/no-mutating-assign': 'error',
        'fp/no-proxy': 'error',
        'fp/no-this': 'error',
        'fp/no-valueof-field': 'error',
        'import/no-absolute-path': 'off',
        'react/prop-types': 'off',
        'unicorn/filename-case': 'off',
        'capitalized-comments': 'off',
        'unicorn/prefer-node-remove': 'off',
        'import/extensions': [
          'error',
          'never',
          {
            png: 'always',
            wav: 'always',
            json: 'always',
          },
        ],
      },
    },
    husky: {
      hooks: {
        'pre-commit': 'lint-staged',
        'pre-push': 'yarn test',
      },
    },
    browserslist: ['defaults', 'not IE 11', 'not IE_Mob 11'],
  }

  return packageJsonTemplate
}

export default getPackageJsonTemplate
