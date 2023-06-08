const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/anime-searcher',

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'anime-searcher'

        return args
      })
  },
})
