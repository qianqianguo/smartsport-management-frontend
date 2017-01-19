import {
  LOGIN_BEGIN,
  LOGIN_SUCC,
  LOGIN_FAIL,
  CHANGE_PWD_BEGIN,
  CHANGE_PWD_SUCC,
  CHANGE_PWD_FAIL
} from 'constants/actionTypes';
import {LOGIN, LOGOUT, CHANGE_PWD} from 'constants/urls';
// 登陆
export function login(obj = {}) {
  obj.succ || (obj.succ = () => {});
  obj.fail || (obj.fail = () => {});
  obj.body || (obj.body = {});
  const body = {
    ...obj.body,
    realm: 'management-user'
  };
  return (dispatch, req) => {
    dispatch({type: LOGIN_BEGIN});
    req.request({url: LOGIN, method: 'post', body}).then(data => {
      dispatch({type: LOGIN_SUCC});
      localStorage.setItem('smartsport/token', `Bearer ${data.token}`);
      localStorage.setItem('smartsport/user', JSON.stringify(data.user));
      obj.succ();
    }).catch(err => {
      obj.fail();
      dispatch({type: LOGIN_FAIL, err});
    });
  };
}
// 登出
export function logout(obj = {}) {
  obj.succ || (obj.succ = () => {});
  localStorage.removeItem('smartsport/token');
  localStorage.removeItem('smartsport/user');
  obj.succ();
  // TODO
  // obj.fail || (obj.fail = () => {});
  // return (dispatch, req) => {
  //   req.request({url: LOGOUT, method: 'post'}).then(data => {
  //     localStorage.removeItem('smartsport/token');
  //     localStorage.removeItem('smartsport/user');
  //     obj.succ();
  //   }).catch(err => {
  //     obj.fail();
  //   });
  // };
}
// 修改密码
export function changePwd(obj = {}) {
  obj.succ || (obj.succ = () => {});
  obj.fail || (obj.fail = () => {});
  obj.body || (obj.body = {});
  return (dispatch, req) => {
    dispatch({type: CHANGE_PWD_BEGIN});
    req.request({url: CHANGE_PWD, method: 'post', body: obj.body}).then(data => {
      dispatch({type: CHANGE_PWD_SUCC});
      localStorage.removeItem('smartsport/token');
      localStorage.removeItem('smartsport/user');
      obj.succ();
    }).catch(err => {
      obj.fail();
      dispatch({type: CHANGE_PWD_FAIL, err});
    });
  };
}