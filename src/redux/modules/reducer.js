import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import test from './Test/TestRed';
import login from './Login/LoginRed';
import permissionsReducer from './Permissions/Permissionsreducer';
import roleReducer from './Role/RoleReducer';
import accountReducer from './Account/AccountReducer';
import AddAccountReducer from './ManageAccount/AddAccountReducer';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  test,
  login,
  permissionsReducer,
  roleReducer,
  accountReducer,
  AddAccountReducer,
});
