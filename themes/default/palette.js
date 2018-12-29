const merge = require('lodash/merge')

const configPalette = typeof WEBPACK_PROVIDED_CONFIG !== 'undefined'
  ? WEBPACK_PROVIDED_CONFIG.palette
  : {}

const defaultPalette = {
  primary: {
    darker: '#5343a2',
    dark: '#5742CA',
    main: '#6457DF',
    light: '#b6b3da',
    lightest: '#EEEAFE'
  }
}

const palette = merge(defaultPalette, configPalette)

export default defaultPalette
