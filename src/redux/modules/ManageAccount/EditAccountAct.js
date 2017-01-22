import { INCREMENT, TEST_FETCH_BEGIN, TEST_FETCH_SUCC, TEST_FETCH_FAIL } from 'constants/actionTypes';
import {TEST} from 'constants/urls';
import {URL_EDITACCOUNT, URL_GETROLELIST} from 'constants/urls';

export function addNumber() {
  return {
    type: INCREMENT
  };
}
// 请求数据，先发送一个请求开始状态的action，请求成功和失败分别再发送action
export function fetchEditSaveAccount(obj) {
  const id = obj.id;
  const url = URL_EDITACCOUNT.replace(':id', id);
  return (dispatch, req, getState)=>{
    dispatch({
      type: TEST_FETCH_BEGIN
    });
    setTimeout(()=>{
      req.request({
        url,
        method: 'PUT',
        body: obj.params,
      }).then(data=>{
        obj.succ();
        dispatch({
        type: TEST_FETCH_SUCC,
        data,
      });
      }).catch(err=>{
        dispatch({
        type: TEST_FETCH_FAIL
      });
        obj.fail();
      });
    }, 2000);
  };
}

export function getRoleList() {
  return (dispatch, req, getState)=>{
    dispatch({
      type: TEST_FETCH_BEGIN
    });
    setTimeout(()=>{
      req.request({
        url: URL_GETROLELIST,
        method: 'get',
      }).then(data=>{
        dispatch({
          type: TEST_FETCH_SUCC,
          data,
        });
      }).catch(err=>{
        dispatch({
          type: TEST_FETCH_FAIL
        });
      });
    }, 2000);
  };
}