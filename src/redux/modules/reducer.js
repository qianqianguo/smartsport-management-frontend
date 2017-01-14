import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import test from './Test/TestRed';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  test,
});
