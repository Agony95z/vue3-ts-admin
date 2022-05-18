// const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  // publicPath: './',
  configureWebpack: {
    plugins: [
      // elementplus 按需引入
      AutoImport({
        // resolvers: [ElementPlusResolver({ importStyle: false })] // 解决element-plus引入loading后 编译出错问题
        resolvers: [
          ElementPlusResolver({
            importStyle: 'css',
            exclude: new RegExp(/^(?!.*loading-directive).*$/)
          })
        ]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      // extensions: ['.ts', 'mjs'],
      alias: {
        components: '@/components'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: {
          '^/api': ''
        },
        ws: true,
        changeOrigin: true
      }
    }
  }
}
