import { INCREMENT, TEST_FETCH_BEGIN, TEST_FETCH_SUCC, TEST_FETCH_FAIL } from 'constants/actionTypes';
import {TEST} from 'constants/urls';
import {URL_ADD_SAVE_ACCOUNT} from 'constants/urls';

export function addNumber() {
  return {
    type: INCREMENT
  };
}
//请求数据，先发送一个请求开始状态的action，请求成功和失败分别再发送action
export function fetchCreateSaveAccount(params) {
  return (dispatch, req, getState)=>{
    dispatch({
      type: TEST_FETCH_BEGIN
    });
    req.request({
      url: URL_ADD_SAVE_ACCOUNT,
      method: 'POST',
      body:params,
    }).then(data=>dispatch({
      type: TEST_FETCH_SUCC,
      data,
    })).catch(err=>dispatch({
      type: TEST_FETCH_FAIL,
    }));

  };
}