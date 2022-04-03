module.exports = {
  important: true,
  content: [
    './src/app/components/**/*.{html,js}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // purge: {
  //   enabled: guessProductionMode(),
  //   content: [ "<path/to/project/**/*.{html, ts, jsx, etc}>" ],
  // },
}
