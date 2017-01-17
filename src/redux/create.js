import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger'

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
})

export default function createStore(history, client, data) {
  // 同步发送路由操作到历史记录
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk]; // TODO 不打印action
  // const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk, loggerMiddleware];

  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware)(_createStore);

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);


  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
