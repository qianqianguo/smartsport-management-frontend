// 公共的配置文件

require('babel-polyfill');

// 环境
const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost', // 客户端主机
  port: process.env.PORT || 3000, // 客户端端口
  apiHost: process.env.APIHOST || 'localhost', // 转发的主机
  apiPort: process.env.APIPORT || 3030, // 转发的端口
  app: { // 用于设置html的head
    title: 'sport',
    description: 'description',
    head: {
      titleTemplate: '智慧体育管理后台%s',
      meta: [
        {name: 'description', content: ''}, // eg:All the modern best practices in one example.
        {charset: 'utf-8'},
        {property: 'og:site_name', content: ''}, // og标签用于优化搜索，eg: React Redux Example
        {property: 'og:image', content: ''}, // eg: https://react-redux.herokuapp.com/logo.jpg
        {property: 'og:locale', content: ''}, // eg: en_US
        {property: 'og:title', content: ''}, // eg: React Redux Example
        {property: 'og:description', content: ''}, // eg: All the modern best practices in one example.
        {property: 'og:card', content: ''}, // eg: summary
        {property: 'og:site', content: ''}, // eg: @erikras
        {property: 'og:creator', content: ''}, // eg: @erikras
        {property: 'og:image:width', content: ''}, // eg: 200
        {property: 'og:image:height', content: ''} // eg: 200
      ]
    }
  },

}, environment);
