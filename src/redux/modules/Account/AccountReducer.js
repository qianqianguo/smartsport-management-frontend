import {
  ACCOUNT_FETCH_BEGIN,
  ACCOUNT_FETCH_SUCC,
  ACCOUNT_FETCH_FAIL,
  SEARCH_ACCOUNT_TEXT,
  SEARCH_NAME_TEXT,
  SEARCH_ACCOUNT_BEGIN,
  SEARCH_ACCOUNT_SUCC,
  SEARCH_ACCOUNT_FAIL,
  SEARCH_NAME_BEGIN,
  SEARCH_NAME_SUCC,
  SEARCH_NAME_FAIL,
} from 'constants/actionTypes';
import initialState from './AccountInitState';

export default function roleReducer(state = initialState, action = {}) {
  switch (action.type) {
  case ACCOUNT_FETCH_BEGIN:
    return {
      ...state,
      fetchState: '发起请求',
    };
  case ACCOUNT_FETCH_SUCC:
    return {
      ...state,
      fetchState: '请求成功',
      data: action.data,
    };
  case ACCOUNT_FETCH_FAIL:
    return {
      ...state,
      fetchState: '发起失败',
    };
  case SEARCH_ACCOUNT_TEXT:
    return {
      ...state,
      searchAccountText: action.searchAccountText,
    };
  case SEARCH_NAME_TEXT:
    return {
      ...state,
      searchNameText: action.searchNameText,
    };
  default:
    return state;
  }
}