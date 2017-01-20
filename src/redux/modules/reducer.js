import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import test from './Test/TestRed';
import login from './Login/LoginRed';
import permissionsReducer from './Permissions/PermissionsReducer';
import roleReducer from './Role/RoleReducer';
import accountReducer from './Account/AccountReducer';

import addAccount from './ManageAccount/AddAccountReducer';
import editAccount from './ManageAccount/EditAccountReducer';
import addRole from './ManageRole/AddRoleReducer';
import editRole from './ManageRole/EditRoleReducer';
import fetchRole from './ManageRole/FetchRoleReducer';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  test,
  login,
  permissionsReducer,
  roleReducer,
  accountReducer,
  addAccount,
  editAccount,
  addRole,
  editRole,
  fetchRole,
});
