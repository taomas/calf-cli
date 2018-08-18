'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
const config = require('../calf.json')
const projectRoot = process.cwd()

exports.assetsPath = function(_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function(options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS
      ? [cssLoader, postcssLoader]
      : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.getConfig = () => {
  return config
}

exports.createAlias = alias => {
  let res = {}
  for (const key in alias) {
    let value = alias[key]
    if (value.startsWith('~')) {
      res[key] = value.replace(/~/g, '')
    } else {
      res[key] = path.resolve(projectRoot, value)
    }
  }
  return res
}

const logProxyApis = proxy => {
  const apisMessage = proxy.apis
    .map(api => {
      return `${proxy.root}${api}`
    })
    .join(`\n      `)
  console.log(`proxy is listening on: \n      ${apisMessage}`)
}

exports.getProxyConfig = proxy => {
  let proxyConfig = {}
  if (proxy.open) {
    logProxyApis(proxy)
    proxy.apis.forEach(function(item) {
      let pathRewriteKey = '^/' + item
      let pathRewriteValue = '/' + item
      proxyConfig['/' + item] = {
        target: proxy.root,
        changeOrigin: true,
        pathRewrite: {
          [pathRewriteKey]: pathRewriteValue
        }
      }
    })
  }
  return proxyConfig
}

exports.resolve = dir => {
  return path.resolve(__dirname, '..', dir)
}
