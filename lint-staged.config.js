module.exports = {
  '**/*.js?(x)': () => 'tsc',
  'src/**/*.{js,md}': ['yarn xo --fix'],
}
