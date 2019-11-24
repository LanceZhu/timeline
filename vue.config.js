// import config from './config.js'
// const UglifyPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    optimization: {
      minimizer: [new TerserPlugin()]
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
