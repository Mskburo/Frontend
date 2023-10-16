module.exports = {
    transpileDependencies: true,
    productionSourceMap: false,
    devServer: {
        port: 1337,
        hot: true,
        https: false,
        open: false,
        proxy: null,
    },
};