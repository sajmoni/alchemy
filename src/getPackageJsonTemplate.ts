import { PackageJson } from 'type-fest'

type ExtendedPackageJson = PackageJson & {
  ava: any
  prettier: any
  xo: any
  husky: any
  browserslist: any
}

const getPackageJsonTemplate = ({ projectName }: { projectName: string }) => {
  const packageJsonTemplate: ExtendedPackageJson = {
    name: projectName,
    version: '0.0.0',
    private: true,
    main: './electron.js',
    scripts: {
      start: 'npm run game && npm run labs',
      game: 'node script/serve.js public src/index.ts 8000',
      labs: 'node script/serve.js public src/labs/index.ts 8001',
      build: 'node script/build.js',
      sound: 'node script/loadSounds.js',
      test: 'ava',
      plop: 'plop --plopfile plop/plopfile.ts',
      qa: 'tsc && xo --fix',
      ase: './script/aseprite.sh',
      'elec:start': 'electron .',
      'elec:build':
        'rm -rf dist && parcel build src/index.html --public-url ./ --target electron',
      'elec:pack': 'npx electron-packager . --overwrite',
      'elec:run': `open ${projectName}-darwin-x64/${projectName}.app`,
      'elec:all': 'npm run elec:build && npm run elec:pack && npm run elec:run',
    },
    ava: {
      require: ['esbuild-runner/register'],
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
        'pre-push': 'npm test',
      },
    },
    browserslist: ['defaults', 'not IE 11', 'not IE_Mob 11'],
  }

  return packageJsonTemplate
}

export default getPackageJsonTemplate
