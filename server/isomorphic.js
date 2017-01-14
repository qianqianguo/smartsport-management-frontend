#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
var path = require('path');
var rootDir = path.resolve(__dirname, '..');
/**
 * Define isomorphic constants.
  同构的设置
 */
global.__CLIENT__ = false; // 除了在app.js自己加进去的，其他找不到用的地方
global.__SERVER__ = true; // 查找不到用的地方
global.__DISABLE_SSR__ = false; // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING // server.js有用到
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'; // create.js热部署，server.js刷新页面，还有这个文件用于同构
if (__DEVELOPMENT__) {
  if (!require('piping')({hook: true, ignore: /(\/\.|~$|\.json|\.scss$)/i})) {
    return;
  }
}
// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .development(__DEVELOPMENT__)
  .server(rootDir, function() {
    require('./server');
  }
);