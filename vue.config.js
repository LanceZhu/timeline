// import config from './config.js'
const UglifyPlugin = require('uglifyjs-webpack-plugin')

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
      minimizer: [new UglifyPlugin({
        uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true, 
              drop_debugger: false,
              pure_funcs: ['console.log'] 
            }
        }
     })
      ]
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://internet.timeline.hfzhang.wang',
        changeOrigin: true,
        onProxyRes: function (proxyRes, req, res) {
        }
      }
    }
  }
}
