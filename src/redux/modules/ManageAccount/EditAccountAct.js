import { ACCOUNT_EDIT_BEGIN, ACCOUNT_EDIT_SUCC, ACCOUNT_EDIT_FAIL } from 'constants/actionTypes';
import {URL_EDITACCOUNT} from 'constants/urls';

// 提交编辑修改后的账号信息请求
export function fetchEditSaveAccount(obj) {
  const id = obj.id;
  const url = URL_EDITACCOUNT.replace(':id', id);
  return (dispatch, req, getState)=>{
    dispatch({
      type: ACCOUNT_EDIT_BEGIN
    });
    req.request({
      url,
      method: 'PUT',
      body: obj.params,
    }).then(data=>{
      obj.succ();
      dispatch({
        type: ACCOUNT_EDIT_SUCC,
      });
    }).catch(err=>{
      dispatch({
        type: ACCOUNT_EDIT_FAIL
      });
      obj.fail(err);
    });
  };
}