import { PackageJson } from 'type-fest'

type ExtendedPackageJson = PackageJson & {
  prettier: any
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
      test: 'vitest',
      plop: 'plop --plopfile plop/plopfile.ts',
      ase: './script/aseprite.sh',
      version:
        'auto-changelog -p -t compact --commit-limit false && git add CHANGELOG.md',
      // 'elec:start': 'electron .',
      // 'elec:build':
      //   'rm -rf dist && parcel build src/index.html --public-url ./ --target electron',
      // 'elec:pack': 'npx electron-packager . --overwrite',
      // 'elec:run': `open ${projectName}-darwin-x64/${projectName}.app`,
      // 'elec:all': 'npm run elec:build && npm run elec:pack && npm run elec:run',
    },
    prettier: {
      semi: false,
      trailingComma: 'all',
      singleQuote: true,
    },
    browserslist: ['defaults', 'not IE 11', 'not IE_Mob 11'],
  }

  return packageJsonTemplate
}

export default getPackageJsonTemplate
