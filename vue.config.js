// import config from './config.js'
// const UglifyPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// webpack 插件
const webpackPlugins = []
if (process.env.ANALYZER) {
  webpackPlugins.push(new BundleAnalyzer())
}

// webpack 打包优化插件
const minimizers = []
if (process.env.NODE_ENV === 'production') {
  minimizers.push(new TerserPlugin({
    terserOptions: {
      ecma: 6,
      compress: { drop_console: true },
      output: { comments: false, beautify: false }
    },
    extractComments: false
  }))
}

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: webpackPlugins,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    optimization: {
      minimize: true,
      minimizer: minimizers
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: `http://${process.env.VUE_APP_DOMAIN_NAME}.timeline.hfzhang.wang`,
        changeOrigin: true,
        onProxyRes: function (proxyRes, req, res) {
        }
      }
    }
  }
}
