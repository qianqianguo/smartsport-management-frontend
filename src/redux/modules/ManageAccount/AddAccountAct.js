import { ROLELIST_GET_BEGIN, ROLELIST_GET_SUCC, ROLELIST_GET_FAIL, ACCOUNT_ADD_BEGIN, ACCOUNT_ADD_SUCC, ACCOUNT_ADD_FAIL} from 'constants/actionTypes';
import {URL_ADDACCOUNT, URL_GETROLELIST} from 'constants/urls';

// 提交添加账号信息请求
export function fetchCreateSaveAccount(obj) {
  return (dispatch, req, getState)=>{
    dispatch({
      type: ACCOUNT_ADD_BEGIN
    });
    req.request({
      url: URL_ADDACCOUNT,
      method: 'post',
      body: obj.params
    }).then(data=>{
      obj.succ();
      dispatch({
        type: ACCOUNT_ADD_SUCC,
      });
    }).catch(err=>{
      dispatch({
        type: ACCOUNT_ADD_FAIL,
      });
      obj.fail(err);
    });
  };
}

// 获取角色列表请求
export function getRoleList() {
  return (dispatch, req, getState)=>{
    dispatch({
      type: ROLELIST_GET_BEGIN
    });
    req.request({
      url: URL_GETROLELIST,
      method: 'get',
    }).then(data=>{
      dispatch({
        type: ROLELIST_GET_SUCC,
        dataRoleList: data,
      });
    }).catch(err=>{
      dispatch({
        type: ROLELIST_GET_FAIL
      });
    });
  };
}