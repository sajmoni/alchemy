module.exports = {
  'src/**/*.{js,ts}?(x)': () => 'tsc',
  'src/**/*.{js,ts,md}': ['xo --fix'],
}
