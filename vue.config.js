const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/bianlian/' : '/'
})
module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/vt/wav2lip': {
        target: 'http://127.0.0.1:5000/vt/wav2lip',  // 将请求代理到后端的地址
        changeOrigin: true,
        pathRewrite: {
          '^/vt/wav2lip': ''
        }
      },
      '/at/baidu': {
        target: 'http://127.0.0.1:5000/at/baidu',
        changeOrigin: true,
        pathRewrite: {
          '^/at/baidu': ''
        }
      },
    }
  }
}
