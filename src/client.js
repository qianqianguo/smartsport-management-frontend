/**
 * 客户端入口文件
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import createStore from './redux/create';
import Request from './utils/Request';
import getRoutes from './routes';

const request = new Request();
const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(_browserHistory, request, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);


const component = (
  <Router render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{request}} filter={item => !item.deferred} />
      } history={history}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

// TODO
// if (process.env.NODE_ENV !== 'production') {
//   window.React = React; // enable debugger
//
//   if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
//     console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
//   }
// }
