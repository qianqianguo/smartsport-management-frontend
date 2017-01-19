import {
  ROLE_FETCH_BEGIN,
  ROLE_FETCH_SUCC,
  ROLE_FETCH_FAIL,
  SEARCH_ROLE_BEGIN,
  SEARCH_ROLE_SUCC,
  SEARCH_ROLE_FAIL,
  SEARCH_ROLE_TEXT,
  } from 'constants/actionTypes';
import initialState from './RoleInitState';

export default function roleReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ROLE_FETCH_BEGIN:
    return {
      ...state,
      fetchState: '发起请求',
    };
  case ROLE_FETCH_SUCC:
    return {
      ...state,
      fetchState: '请求成功',
      data: action.data,
    };
  case ROLE_FETCH_FAIL:
    return {
      ...state,
      fetchState: '发起失败',
      errMsg: action.errMsg,
    };
  case SEARCH_ROLE_BEGIN:
    return {
      ...state,
      fetchState: '开始搜索',
    };
  case SEARCH_ROLE_SUCC:
    return {
      ...state,
      fetchState: '搜索成功',
      data: action.data,
    };
  case SEARCH_ROLE_FAIL:
    return {
      ...state,
      fetchState: '搜索失败',
    };
  case SEARCH_ROLE_TEXT:
    return {
      ...state,
      searchText: action.searchText,
    };
  default:
    return state;
  }
}