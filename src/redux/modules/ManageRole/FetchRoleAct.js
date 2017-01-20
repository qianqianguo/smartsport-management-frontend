import {INCREMENT, TEST_FETCH_BEGIN, TEST_FETCH_SUCC, TEST_FETCH_FAIL} from 'constants/actionTypes';
import {URL_FETCHROLE} from 'constants/urls';

export function increment() {
  return {
    type: INCREMENT
  };
}
// 请求数据，先发送一个请求开始状态的action，请求成功和失败分别再发送action
export function fetchRolesData() {
  return (dispatch, req, getState)=>{
    dispatch({
      type: TEST_FETCH_BEGIN
    });
    setTimeout(()=>{
      req.request({
        url: URL_FETCHROLE,
        method: 'post',
      }).then(data=>dispatch({
        type: TEST_FETCH_SUCC,
        roleData: data,
      })).catch(err=>dispatch({
        type: TEST_FETCH_FAIL
      }));
    }, 2000);
  };
}