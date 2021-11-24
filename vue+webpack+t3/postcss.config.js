const path = require('path')

module.exports = ({ file }) => {
  const designWidth = file.includes(
    path.join('node_modules', 'vant')
  )
    ? 375
    : 750
  return {
    plugins: {
      'postcss-preset-env': {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: designWidth,
        unitPrecision: 3,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: ['.ignore', 'van'],
        minPixelValue: 1,
        mediaQuery: false,
        replace: true,
        exclude: [/node_modules/],
        landscape: false,
        landscapeUnit: 'vw',
        landscapeWidth: 568
      }
    }
  }
}
