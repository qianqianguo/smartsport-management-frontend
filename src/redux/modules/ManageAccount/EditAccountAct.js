import { INCREMENT, TEST_FETCH_BEGIN, TEST_FETCH_SUCC, TEST_FETCH_FAIL } from 'constants/actionTypes';
import {TEST} from 'constants/urls';
import {URL_EDIT_SAVE_ACCOUNT} from 'constants/urls';

export function addNumber() {
  return {
    type: INCREMENT
  };
}
//请求数据，先发送一个请求开始状态的action，请求成功和失败分别再发送action
export function fetchEditSaveAccount(pramsJson) {
  return (dispatch, req, getState)=>{
    dispatch({
      type: TEST_FETCH_BEGIN
    });
    setTimeout(()=>{
      req.request({
        url: URL_EDIT_SAVE_ACCOUNT,
        method: 'PUT',
        body:pramsJson,
      }).then(data=>dispatch({
        type: TEST_FETCH_SUCC,
        data,
      })).catch(err=>dispatch({
        type: TEST_FETCH_FAIL
      }));
    }, 2000);
  };
}