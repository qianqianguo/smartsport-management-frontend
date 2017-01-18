import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import path from 'path';
import http from 'http';
import request from 'request';
import {syncHistoryWithStore} from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import config from '../src/constants/config';
import createStore from '../src/redux/create';
import Request from '../src/utils/Request';
import Html from '../src/IndexHtml';
const app = new Express(); // app
const server = new http.Server(app); // 服务器
app.use(compression()); // 压缩响应体
// 加载静态资源
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));
// 需要转发过去的服务器地址
const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
// 代理转发，解决跨域问题
app.use('/proxy', (req, res) => {
  // TODO demo用
  if (req.url.includes('test')) {
    res.json({
      status: {
        code: 1,
        msg: 'request fail'
      },
      data: [1, 2, 3]
    });
    return;
  }
  if (req.url.includes('/api/mgmt_account/login')) {
    res.json({
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsbSI6Im1hbmFnZW1lbnQtdXNlciIsImlhdCI6MTQ4NDYxODgyNiwiZXhwIjoxNDg0NjI2MDI2LCJzdWIiOiI1ODc4ODk0MDAzMjlmMzFlMjNkOWVmMjQiLCJqdGkiOiI1ODdkN2M0YTA4YzdhZGU5MTZkMjQzMDIifQ.wlV9u9diWGZDqV2r5Uk0GBRz4bkXtn-7-u0qHSqx-W4",
        "user": {
          "_id": "587889400329f31e23d9ef24",
          "accountId": "tester",
          "name": "tester",
          "status": 1,
          "role": "daddy",
          "__v": 0
        }
      },
      "status": {
        "code": 0,
        "msg": "request success"
      }
    });
    return;
  }
  if (req.url.includes('/api/mgmt_account/logout')) {
    res.json({
      "data": {
        "success": true
      },
      "status": {
        "code": 1,
        "msg": "request success"
      }
    });
    return;
  }
  const url = targetUrl + req.url;
  req.pipe(request(url)).pipe(res);
});
// 同构
app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // 开发环境不缓存webpack的状态
    webpackIsomorphicTools.refresh();
  }
  const client = new Request(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);
  res.send('<!doctype html>\n' + ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
});
// 提供端口，及打印错误信息
if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}