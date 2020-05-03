import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import copy from 'rollup-plugin-copy'

const OUTPUT_FOLDER = 'dist'

export default {
  input: 'src/index.js',
  output: {
    banner: '#!/usr/bin/env node',
    file: `${OUTPUT_FOLDER}/bundle.js`,
    format: 'cjs',
  },
  external: [
    'commander',
    'chalk',
    'path',
    'fs-extra',
    'os',
    'mustache',
    'execa',
    'listr',
    'cfonts',
  ],
  plugins: [
    commonjs(),
    json(),
    copy({
      targets: [{ src: 'template/*', dest: `${OUTPUT_FOLDER}/template` }],
    }),
  ],
}
