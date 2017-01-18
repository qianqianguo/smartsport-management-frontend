import {LOGIN_BEGIN, LOGIN_SUCC, LOGIN_FAIL} from 'constants/actionTypes';
import {LOGIN, LOGOUT} from 'constants/urls';

// 登陆
export function login(obj = { succ: ()=>{}, fail: ()=>{}, body: {}}) {
  const body = {
    ...obj.body,
    realm: 'management-user'
  };
  return (dispatch, req)=>{
    dispatch({
      type: LOGIN_BEGIN
    });
    req.request({
      url: LOGIN,
      method: 'post',
      body
    }).then(data=>{
      dispatch({
        type: LOGIN_SUCC
      });
      localStorage.setItem('smartsport/token', `Bearer ${data.token}`);
      localStorage.setItem('smartsport/user', JSON.stringify(data.user));
      obj.succ();
    }).catch(err=>{
      obj.fail();
      dispatch({
        type: LOGIN_FAIL,
        err
      })
    });
  };
}
// 登出
export function logout(obj = {succ: ()=>{}, fail: ()=>{}}) {
  return (dispatch, req) => {
    req.request({
      url: LOGOUT,
      method: 'post'
    }).then(data=>{
      localStorage.removeItem('smartsport/token');
      localStorage.removeItem('smartsport/user');
      obj.succ();
    }).catch(err => {
      obj.fail();
    });
  };
}
