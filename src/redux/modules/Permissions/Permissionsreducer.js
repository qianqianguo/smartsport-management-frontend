import initialState from './PermissionsInitState';
import {PERMISSIONS_FETCH_BEGIN, PERMISSIONS_FETCH_SUCC, PERMISSIONS_FETCH_FAIL} from 'constants/actionTypes';

export default function permissionsReducer(state = initialState, action = {}) {
  switch (action.type) {
  case PERMISSIONS_FETCH_BEGIN:
    return {
      ...state,
      fetchState: '发起请求',
    };
  case PERMISSIONS_FETCH_SUCC:
    return {
      ...state,
      fetchState: '发起请求',
      data: action.data,
    };
  case PERMISSIONS_FETCH_FAIL:
    return {
      ...state,
      fetchState: '发起失败',
      errMsg: action.errMsg,
    };
  default:
    return state;
  }
}