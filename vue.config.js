const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap: false,
    devServer: {
        port: 1337,
        // host: '192.168.0.102',
        hot: true,
        https: false,
        open: true,
        proxy: null,
    }
})
