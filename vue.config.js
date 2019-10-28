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
                target: 'http://10.102.251.251:20080/',
                // changeOrigin: true,
                pathRewrite: {
                    '/api': '/'
                },
                onProxyRes: function(proxyRes, req, res) {
                },
            },
        },
    }
}