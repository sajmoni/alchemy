module.exports = {
  '**/*.js?(x)': () => 'tsc',
  'src/**/*.{js,md}': ['eslint --fix', 'prettier --write'],
}
