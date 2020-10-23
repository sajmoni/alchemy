module.exports = ({ projectName }) => {
  const packageJsonTemplate = {
    name: projectName,
    version: '0.0.0',
    private: true,
    main: './electron.js',
    scripts: {
      start: 'parcel src/index.html --no-autoinstall --no-cache',
      labs: 'parcel labs/index.html --no-autoinstall --no-cache',
      build: 'rm -rf dist && parcel build src/index.html --public-url ./',
      test: 'ava',
      plop: 'plop --plopfile plop/plopfile.ts',
      qa: 'tsc && xo --fix',
      munch:
        'muncher --input asset/sprite --output static/spritesheet/spritesheet --flip',
      validate: 'babel-node ./script/validateData.js',
      'elec:start': 'electron .',
      'elec:build':
        'rm -rf dist && parcel build src/index.html --public-url ./ --target electron',
      'elec:pack': 'yarn electron-packager . --overwrite',
      'elec:run': `open ${projectName}-darwin-x64/${projectName}.app`,
      'elec:all': 'yarn elec:build && yarn elec:pack && yarn elec:run',
    },
    ava: {
      require: ['./script/setupTests.js'],
      extensions: ['js', 'ts'],
    },
    prettier: {
      trailingComma: 'all',
      semi: false,
      singleQuote: true,
      useTabs: false,
      bracketSpacing: true,
    },
    xo: {
      extends: 'xo-react',
      prettier: true,
      parser: '@typescript-eslint/parser',
      env: ['browser', 'es2020', 'node'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/prefer-readonly-parameter-types': 'off',
        'import/no-absolute-path': 'off',
        'react/prop-types': 'off',
        'unicorn/filename-case': 'off',
        'capitalized-comments': 'off',
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': 'off',
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
        'pre-push': 'yarn test && yarn validate',
      },
    },
    browserslist: ['defaults', 'not IE 11', 'not IE_Mob 11'],
  }

  return packageJsonTemplate
}
