import { INCREMENT, TEST_FETCH_BEGIN, TEST_FETCH_SUCC, TEST_FETCH_FAIL } from 'constants/actionTypes';
import {URL_EDITROLE} from 'constants/urls';

// 获取编辑角色模块和权限数据
export function getDataEditRoleJurisdiction(obj) {
  const id = obj.id;
  const path = URL_EDITROLE.replace(':userRoleId', id);
  const url = path.replace('xxx', obj.idRole);

  return (dispatch, req, getState)=>{
    dispatch({
      type: TEST_FETCH_BEGIN
    });
    setTimeout(()=>{
      req.request({
        url,
        method: 'get',
      }).then(data=>{
        dispatch({
          type: TEST_FETCH_SUCC,
          data,
        });
        obj.succ(data);
      }).catch(err=>{
        dispatch({
          type: TEST_FETCH_FAIL
        });
        obj.fail(err);
      });
    }, 2000);
  };
}