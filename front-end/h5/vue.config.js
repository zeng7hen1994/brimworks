// const ProxyAgent = require('proxy-agent')
const isProd = process.env.NODE_ENV === 'production'

const PROD_API_ORIGIN = 'https://radiant-depths-79548.herokuapp.com'
const DEV_API_ORIGIN = 'http://localhost:1337'

module.exports = {
  runtimeCompiler: true,
  publicPath: isProd ? '/luban-h5/' : '/',
  devServer: {
    // proxy: API_ORIGIN
    proxy: {
      '/works': {
        // agent: new ProxyAgent('socks5://127.0.0.1:1086'),
        target: isProd ? PROD_API_ORIGIN : DEV_API_ORIGIN,
        changeOrigin: true,
        ws: false
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Index Page'
    }
    // engine: {
    //   entry: 'src/engine-entry.js'
    // }
  }
}
