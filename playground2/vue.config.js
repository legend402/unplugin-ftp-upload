const { defineConfig } = require('@vue/cli-service')
const Unplugin = require('../dist/webpack.cjs')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'h5',
  configureWebpack: {
    plugins: [
      Unplugin.default({
        ...require('./auth.json'),
        serviceDir: '/root/web/test',
        delay: 1500,
      })
    ]
  },
})
