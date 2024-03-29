const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const { commitNumber, commitDate } = require('./scripts/version') // 打包时在 index.html meta 信息中记录版本号及日期

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

let webpackExternals = {}
if (process.env.NODE_ENV === 'production') {
  webpackExternals = {
    axios: 'axios',
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    'element-ui': 'ELEMENT'
    // 'vue-quill-editor': 'VueQuillEditor'
  }
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
      minimizer: minimizers,
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        automaticNameMaxLength: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    externals: webpackExternals
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].meta = {
        version: `${commitDate} ${commitNumber}`,
        publish: `${new Date()}`
      }
      return args
    })
  },
  devServer: {
    proxy: {
      '/api': {
        target: `http://${process.env.VUE_APP_SUBDOMAIN}.welishi.cn`,
        changeOrigin: true,
        router: {
          'localhost:8081': 'http://dev.internal.feel.ac.cn'
        },
        headers: {
          Host: `${process.env.VUE_APP_SUBDOMAIN}.welishi.cn`
        }
      },
      '/attachment': {
        target: `http://${process.env.VUE_APP_SUBDOMAIN}.welishi.cn`,
        changeOrigin: true,
        router: {
          'localhost:8081': 'http://dev.internal.feel.ac.cn'
        },
        headers: {
          Host: `${process.env.VUE_APP_SUBDOMAIN}.welishi.cn`
        }
      }
    }
  }
}
