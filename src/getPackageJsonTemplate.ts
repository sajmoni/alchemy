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
    scripts: {
      start: 'vite --open',
      labs: 'vite --open --port 3001 --config vite-labs.config.ts',
      build: 'vite build',
      preview: 'vite preview --open --port 8080',
      sound: 'node -r esbuild-runner/register script/loadSounds.ts',
      test: 'ava',
      plop: 'plop --plopfile plop/plopfile.ts',
      qa: 'tsc && xo src --fix',
      ase: './script/aseprite.sh',
      // 'elec:start': 'electron .',
      // 'elec:build':
      //   'rm -rf dist && parcel build src/index.html --public-url ./ --target electron',
      // 'elec:pack': 'npx electron-packager . --overwrite',
      // 'elec:run': `open ${projectName}-darwin-x64/${projectName}.app`,
      // 'elec:all': 'npm run elec:build && npm run elec:pack && npm run elec:run',
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
      prettier: true,
      parser: '@typescript-eslint/parser',
      env: ['browser', 'es2020', 'node'],
      rules: {
        'import/order': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'unicorn/prefer-module': 'off',
        'node/prefer-global/process': 'off',
        'unicorn/no-array-method-this-argument': 'off',
        'import/no-absolute-path': 'off',
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
