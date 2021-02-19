module.exports = {
    publicPath: '/',
    outputDir: 'lib',
    css: {
        extract: false
    },
    chainWebpack: config => {
        config.module.rule('md')
            .test(/\.md/)
            .use('raw-loader')
            .loader('raw-loader')
    }
}
