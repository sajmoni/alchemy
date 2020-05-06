module.exports = {
  '**/*.{js,ts}?(x)': () => 'tsc',
  'src/**/*.{js,ts,md}': ['xo --fix'],
}
