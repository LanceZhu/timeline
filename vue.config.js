module.exports = {
    publicPath: '',
    outputDir: 'dist',
    runtimeCompiler: true,
    configureWebpack: {
        plugins: []
    },
    devServer: {
        proxy: {
            '/_api': {
                target: 'http://10.102.251.251:20080/',
                changeOrigin: true,
                pathRewrite: {
                    '/_api': '/'
                }
            }
        }
    }
}