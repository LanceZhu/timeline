// import config from './config.js'

const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '',
    outputDir: 'dist',
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [],
        resolve:{
            alias:{
                '@': resolve('src'),
            },
        },
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://timeline.hfzhang.wang',
                changeOrigin: true,
                onProxyRes: function(proxyRes, req, res) {
                },
            },
        },
    }
}