'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const config = utils.getConfig()
const proxyConfig = utils.getProxyConfig(config.proxy)
const devConfig = config.dev
const devServer = config.devServer

const createDevServerConfig = function(port) {
  const HOST = process.env.HOST
  const PORT = port && Number(port)
  return {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(devConfig.assetsPublicPath, 'index.html')
        }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || devServer.host,
    port: PORT || devServer.port,
    open: devServer.autoOpenBrowser,
    overlay: devServer.errorOverlay ? { warnings: false, errors: true } : false,
    publicPath: devServer.assetsPublicPath,
    proxy: proxyConfig,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: devServer.poll
    }
  }
}

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: devConfig.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: devConfig.devtool,
  // webpack dev plugins
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"development"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: devConfig.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

const getFriendlyErrorsPlugin = port => {
  return new FriendlyErrorsPlugin({
    compilationSuccessInfo: {
      messages: [
        `Your application is running here: http://${
          devWebpackConfig.devServer.host
        }:${port}`
      ]
    },
    onErrors: config.dev.notifyOnErrors
      ? utils.createNotifierCallback()
      : undefined
  })
}

const getWebpackDevConfig = () => {
  return new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.devServer.port
    portfinder
      .getPortPromise()
      .then(port => {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port
        // create webpack-dev-server config
        devWebpackConfig.devServer = createDevServerConfig(port)
        // Add FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(getFriendlyErrorsPlugin(port))
        resolve(devWebpackConfig)
      })
      .catch(err => {
        reject(err)
      })
  })
}

module.exports = getWebpackDevConfig()
