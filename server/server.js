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
  if (req.url.includes('api/auth/role')) {
    res.json({
      status: {
        code: 0,
        msg: 'request fail'
      },
      data: [
        {
          key: '1',
          role: '123',
        }, {
          key: '2',
          role: '123',
        }, {
          key: '3',
          role: '789',
        }, {
          key: '4',
          role: '789',
        }
      ]
    });
    return;
  }
  if (req.url.includes('api/auth/permissons')) {
    res.json({
      status: {
        code: 0,
        msg: 'request fail'
      },
      data: [
        {
          _id: 1,
          name: '权限模块1',
          permissions: [
            {
              _id: 1,
              name: '普通权限1',
              code: 1234,
            },
            {
              _id: 2,
              name: '普通权限2',
              code: 1234,
            },
            {
              _id: 3,
              name: '普通权限3',
              code: 1234,
            },
            {
              _id: 4,
              name: '普通权限4',
              code: 1234,
            },
          ]
        },
        {
          _id: 2,
          name: '权限模块2',
          permissions: [
            {
              _id: 1,
              name: '普通权限5',
              code: 1234,
            },
            {
              _id: 2,
              name: '普通权限6',
              code: 1234,
            },
            {
              _id: 3,
              name: '普通权限7',
              code: 1234,
            },
            {
              _id: 4,
              name: '普通权限8',
              code: 1234,
            },
          ]
        }
      ]
    });
    return;
  }
  if (req.url.includes('api/auth/user')) {
    res.json({
      status: {
        code: 0,
        msg: 'request fail'
      },
      data: [
        {
          key: '1',
          account: 'a4',
          name: 32,
          address: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          key: '2',
          account: 'b4',
          name: 42,
          address: 'London No. 1 Lake Park',
          status: 0,
        }, {
          key: '3',
          account: 'c4',
          name: 32,
          address: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          key: '4',
          account: 'd4',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '5',
          account: 'e4',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        },
        {
          key: '6',
          account: 'a3',
          name: 32,
          address: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          key: '7',
          account: 'b3',
          name: 42,
          address: 'London No. 1 Lake Park',
          status: 0,
        }, {
          key: '8',
          account: 'c3',
          name: 32,
          address: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          key: '9',
          account: 'd4',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '10',
          account: 'e3',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '11',
          account: 'a2',
          name: 32,
          address: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          key: '12',
          account: 'b2',
          name: 42,
          address: 'London No. 1 Lake Park',
          status: 0,
        }, {
          key: '13',
          account: 'c2',
          name: 32,
          address: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          key: '14',
          account: 'd2',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '15',
          account: 'e2',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '16',
          account: 'a1',
          name: 32,
          address: 'New York No. 1 Lake Park',
          status: 0,
        }, {
          key: '17',
          account: 'b1',
          name: 42,
          address: 'London No. 1 Lake Park',
          status: 0,
        }, {
          key: '18',
          account: 'c1',
          name: 32,
          address: 'Sidney No. 1 Lake Park',
          status: 1,
        }, {
          key: '19',
          account: 'd1',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }, {
          key: '20',
          account: 'e1',
          name: 32,
          address: 'London No. 2 Lake Park',
          status: 1,
        }
      ]
    });
    return;
  }
  if (req.url.includes('/api/user/login')) {
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
  if (req.url.includes('/api/auth/user/logout')) {
    res.json({
      "data": {
        "success": true
      },
      "status": {
        "code": 0,
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