// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    'postcss-import': {},
    'postcss-url': {},
    'autoprefixer': {},
    'precss': {},
    'postcss-pxtorem': {
      rootValue: 37.5,
      selectorBlackList: ['no-rem'],
      propList: ['*', '!border*']
    }
  }
}
